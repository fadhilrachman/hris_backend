import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DatabaseService } from 'src/database/database.service';
import { LogActivityService } from 'src/log-activity/log-activity.service';
import { createPagination } from 'src/lib/pagination';
import { HeadersOperator } from 'src/lib/shared-dto';
import { ChangePasswordEmployeeDto, CreateEmployeeDto } from './dto/request';
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
        data: { ...body, password: finallyPassword, code, role: 'employee' },
        select: {
          id: true,
          name: true,
          nik: true,
          address: true,
          avatar: true,
          code: true,
          company: true,
          division_id: true,
          email: true,
          pob: true,
          dob: true,
          phone: true,
          region: true,
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
    };

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
      },
    });
    return {
      data: result,
      pagination,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
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
}
