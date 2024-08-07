import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LogActivityService } from 'src/log-activity/log-activity.service';
import { createPagination } from 'src/lib/pagination';
import { HeadersOperator } from 'src/lib/shared-dto';
import {
  ChangePasswordEmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './dto/request';
import * as bcrypt from 'bcrypt';
import { createCode } from 'src/lib/create-code';
import { OPERATOR_ACTIVITY } from 'src/lib/constants';
import { errorHandler } from 'src/lib/response';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logActivityService: LogActivityService,
  ) {}
  async create({
    body,
    user,
  }: {
    body: CreateEmployeeDto;
    user: HeadersOperator;
  }) {
    /// VALIDATION
    const checkEmail = await this.databaseService.user.findFirst({
      where: {
        email: body.email,
        company_id: user.company_id,
      },
    });

    console.log({ checkEmail });

    if (checkEmail) {
      throw new BadRequestException(
        errorHandler({
          errors: [{ email: ['Email already registered'] }],
        }),
      );
    }

    ////////////////////////
    const { company_id, user_id, ip } = user;

    const code = createCode({
      code: 'operator/employee',
      length: await this.databaseService.user.count({
        where: {
          company_id,
        },
      }),
    });

    const result = await this.databaseService.$transaction(async (prisma) => {
      const saltRounds = 10;
      const finallyPassword = await bcrypt.hash(body.nik, saltRounds);
      const data = await this.databaseService.user.create({
        data: {
          ...body,
          company_id: user.company_id,
          password: finallyPassword,
          code,
          role: 'employee',
        },
        select: {
          id: true,
          name: true,
          nik: true,
          address: true,
          avatar: true,
          code: true,
          // company: true,
          email: true,
          pob: true,
          dob: true,
          phone: true,
          region: true,
          job_title: true,
        },
      });

      await this.logActivityService.createLogActivity({
        action_type: 'create',
        user_id,
        activity: OPERATOR_ACTIVITY['operator/employee'].create,
        company_id,
        date: new Date(),
        ip,
        module: 'operator/employee',
        new_data: data as object,
        previous_data: null,
      });
      return data;
    });

    return result;
  }

  async findAll(
    {
      page = 1,
      perPage = 10,
      division_id,
      search,
    }: { page: number; perPage: number; division_id?: string; search?: string },
    user: HeadersOperator,
  ) {
    const { company_id } = user;

    /// PAGINATION
    const skip = (page - 1) * perPage;
    const pagination = createPagination({
      page,
      per_page: perPage,
      total_data: await this.databaseService.user.count({
        where: { company_id, deleted_at: null },
      }),
    });

    /// FILTER
    let filter: {
      division_id?: string;
      name?: {
        contains: string;
      };
    } = {};

    console.log({ search });

    if (division_id) filter.division_id = division_id;

    if (search)
      filter.name = {
        contains: search,
      };
    // DATA
    const result = await this.databaseService.user.findMany({
      skip,
      take: perPage,
      where: {
        company_id,
        deleted_at: null,

        ...filter,
      },
      select: {
        id: true,
        name: true,
        nik: true,
        email: true,
        avatar: true,
        code: true,
        job_title: true,
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      data: result,
      pagination,
    };
  }

  async findOne({ id }: { id: string }) {
    const result = await this.databaseService.user.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        name: true,
        nik: true,
        address: true,
        avatar: true,
        code: true,
        // company: true,
        email: true,
        pob: true,
        dob: true,
        phone: true,
        region: true,
        job_title: true,
        division: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return result;
  }

  async update({
    id,
    body,
    user,
  }: {
    id: string;
    body: UpdateEmployeeDto;
    user: HeadersOperator;
  }) {
    ///////////////// VALIDATION
    const checkData = await this.databaseService.user.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        name: true,
        nik: true,
        address: true,
        avatar: true,
        code: true,
        // company: true,
        email: true,
        pob: true,
        dob: true,
        phone: true,
        region: true,
        job_title: true,
      },
    });
    if (!checkData)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    //////////////
    const { company_id, user_id, ip } = user;
    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await this.databaseService.user.update({
        where: { id },
        data: body,
        select: {
          id: true,
          name: true,
          nik: true,
          address: true,
          avatar: true,
          code: true,
          company: true,
          email: true,
          pob: true,
          dob: true,
          phone: true,
          region: true,
          job_title: true,
        },
      });

      await this.logActivityService.createLogActivity({
        action_type: 'update',
        user_id,
        activity: OPERATOR_ACTIVITY['operator/employee'].update,
        company_id,
        date: new Date(),
        ip,
        module: 'operator/employee',
        new_data: data as object,
        previous_data: checkData as object,
      });
      return data;
    });
    return result;
  }

  async remove({ id, user }: { id: string; user: HeadersOperator }) {
    ///////////////// VALIDATION
    console.log({ id });

    const checkData = await this.databaseService.user.findUnique({
      where: { id, deleted_at: null },
    });
    console.log({ checkData });

    if (!checkData)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );
    //////////////

    const { company_id, ip, user_id } = user;
    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await this.databaseService.user.update({
        where: { id },
        data: {
          deleted_at: new Date(),
        },
      });

      await this.logActivityService.createLogActivity({
        action_type: 'delete',
        user_id,
        activity: OPERATOR_ACTIVITY['operator/employee'].delete,
        company_id,
        date: new Date(),
        ip,
        module: 'operator/employee',
        new_data: null,
        previous_data: null,
      });
      return data;
    });

    return 'Success delete data';
  }

  async changePassword({
    data,
    user,
    employee_id,
  }: {
    data: ChangePasswordEmployeeDto;
    user: HeadersOperator;
    employee_id: string;
  }) {
    const { password } = data;
    const { user_id, company_id, ip } = user;

    ///CHECK EMPLOYEE
    const checkEmployee = await this.databaseService.user.findUnique({
      where: {
        id: employee_id,
        deleted_at: null,
      },
    });
    if (!checkEmployee)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    ///
    const saltRounds = 10;
    const finallyPassword = await bcrypt.hash(password, saltRounds);

    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await this.databaseService.user.update({
        where: {
          id: employee_id,
          deleted_at: null,
        },
        select: {
          id: true,
          name: true,
          nik: true,
        },
        data: {
          password: finallyPassword,
        },
      });

      await this.logActivityService.createLogActivity({
        action_type: 'update',
        activity: OPERATOR_ACTIVITY['operator/employee']['change-password'],
        ip,
        user_id,
        company_id,
        date: new Date(),
        module: 'operator/employee',
        new_data: null,
        previous_data: null,
      });
    });
    return result;
  }

  async import({
    body,
    user,
  }: {
    body: CreateEmployeeDto[];
    user: HeadersOperator;
  }) {
    const { company_id } = user;
    //////////////////// VALIDATION  ////////////////////

    const checkDuplicateData = await this.databaseService.user.findMany({
      where: {
        company_id,
        email: {
          in: body.map((val) => val.email),
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (checkDuplicateData.length != 0)
      throw new BadRequestException(
        errorHandler({
          errors: [
            {
              data: [
                `Email ${checkDuplicateData.map((val) => {
                  return ` ${val.email},`;
                })} already registered`,
              ],
            },
          ],
        }),
      );

    //////////////////
    const countUser = await this.databaseService.user.count({
      where: { company_id, deleted_at: null },
    });

    let length = countUser;
    const finallyPayload = body.map(async (val) => {
      const saltRounds = 10;
      const finallyPassword = await bcrypt.hash(val.nik, saltRounds);
      const code = createCode({
        code: 'operator/employee',
        length: length++,
      });
      return { ...val, password: finallyPassword, code };
    });

    return finallyPayload;
    // const result = await this.databaseService.$transaction(async(prisma)=>{
    //  await prisma.user.createMany({data:finallyPayload})
    // })
  }
}
