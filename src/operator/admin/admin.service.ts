import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/request';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { createPagination } from 'src/lib/pagination';
import { errorHandler } from 'src/lib/response';
import { LogActivityService } from 'src/log-activity/log-activity.service';
import { OPERATOR_ACTIVITY } from 'src/lib/constants';

@Injectable()
export class AdminService {
  constructor(
    private readonly databaseService: DatabaseService,

    private readonly logActivityService: LogActivityService,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { email, name, password, ip, user_id } = createAdminDto;

    const checkDuplicate = await this.databaseService.user.findFirst({
      where: { email, deleted_at: null },
    });

    if (checkDuplicate)
      throw new BadRequestException(
        errorHandler({ errors: [{ email: ['User already exists'] }] }),
      );

    const saltRounds = 10;
    const finallyPassword = await bcrypt.hash(password, saltRounds);

    const payload: {
      name: string;
      email: string;
      role: 'operator';
      password: string;
    } = {
      name,
      email,
      role: 'operator',
      password: finallyPassword,
    };
    const result = await this.databaseService.$transaction(async (prisma) => {
      // Query pertama
      const user = await prisma.user.create({
        data: { ...payload, code: '2334234' },
      });

      // await this.logActivityService.createLogActivity({
      //   action_type: 'create',
      //   activity: OPERATOR_ACTIVITY['operator/admin'].create,
      //   company_id: null,
      //   date: new Date(),
      //   module: 'operator/admin',
      //   new_data: payload,
      //   previous_data: null,
      //   user_id: user.id,
      //   ip,
      // });

      return user;
    });

    const { id, company_id, phone } = result;
    return {
      id,
      name,
      email,
      company_id,
      phone,
    };
  }

  async findAll({ page = 1, perPage = 10 }: { page: number; perPage: number }) {
    /// PAGINATION
    const skip = (page - 1) * perPage;
    const pagination = createPagination({
      page,
      per_page: perPage,
      total_data: await this.databaseService.user.count({
        where: { role: 'operator' },
      }),
    });

    return {
      data: await this.databaseService.user.findMany({
        where: { role: 'operator', deleted_at: null },
        skip,
        take: perPage,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company_id: true,
          // created_at: true,
          // update_at: true,
        },
      }),
      pagination,
    };
  }

  async findOne(id: string) {
    const result = await this.databaseService.user.findUnique({
      where: { id, deleted_at: null },
    });
    if (!result)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );
    const { company_id, phone, name, email } = result;
    return {
      id,
      name,
      email,
      company_id,
      phone,
    };
  }

  async update(id: string, updateAdminDto: CreateAdminDto) {
    const { email, name, password } = updateAdminDto;

    const checkDuplicate = await this.databaseService.user.findFirst({
      where: { email },
    });

    if (checkDuplicate)
      throw new BadRequestException(
        errorHandler({ errors: [{ email: ['User already exists'] }] }),
      );

    // const saltRounds = 10;
    // const finallyPassword = await bcrypt.hash(password, saltRounds);

    const payload: {
      name: string;
      email: string;
      role: 'operator';
    } = {
      name,
      email,
      role: 'operator',
    };
    const result = await this.databaseService.user.update({
      where: { id },
      data: { ...payload, code: '2334234' },
    });

    const { company_id, phone } = result;
    return {
      id,
      name,
      email,
      company_id,
      phone,
    };
  }

  async remove(user_id: string, data: { user_id: string; ip: string }) {
    console.log({ user_id, data });

    const [result, cuy] = await this.databaseService.$transaction([
      this.databaseService.user.update({
        where: { id: user_id, deleted_at: null },
        data: { deleted_at: new Date() },
      }),
      this.logActivityService.createLogActivity({
        action_type: 'delete',
        activity: OPERATOR_ACTIVITY['operator/admin'].delete,
        company_id: null,
        date: new Date(),
        module: 'operator/admin',
        new_data: null,
        previous_data: null,
        user_id: data.user_id,
        ip: data.ip,
      }),
    ]);

    if (!result)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    const { email, name, company_id, phone } = result;
    return {
      id: user_id,
      name,
      email,
      company_id,
      phone,
    };
  }
}
