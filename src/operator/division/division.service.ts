import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDivisionDto } from './dto/update-division.dto';
import { DatabaseService } from 'src/database/database.service';
import { createPagination } from 'src/lib/pagination';
import { CreateDivisionDto } from './dto/request';
import { createCode } from 'src/lib/create-code';
import { LogActivityService } from 'src/log-activity/log-activity.service';
import { OPERATOR_ACTIVITY } from 'src/lib/constants';
import { errorHandler } from 'src/lib/response';
import { DefaultRequestOperator } from 'src/lib/request-dto';
import { HeadersOperator } from 'src/lib/shared-dto';

@Injectable()
export class DivisionService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logActivityService: LogActivityService,
  ) {}
  async create({
    body,
    user,
  }: {
    body: CreateDivisionDto;
    user: HeadersOperator;
  }) {
    const { ip, user_id, company_id } = user;

    const length = await this.databaseService.division.count({
      where: { company_id, deleted_at: null },
    });
    const code = createCode({ code: 'operator/divison', length });

    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await prisma.division.create({
        data: { ...body, code, company_id },
      });
      await this.logActivityService.createLogActivity({
        action_type: 'create',
        activity: OPERATOR_ACTIVITY['operator/division'].crete,
        company_id,
        date: new Date(),
        module: 'operator/division',
        new_data: data as object,
        previous_data: null,
        user_id: user_id,
        ip: ip,
      });
      return data;
    });
    return result;
  }

  async findAll(
    { page = 1, perPage = 10 }: { page: number; perPage: number },
    company_id: string,
  ) {
    const skip = (page - 1) * perPage;
    const pagination = createPagination({
      page,
      per_page: perPage,
      total_data: await this.databaseService.division.count({
        where: { company_id, deleted_at: null },
      }),
    });

    const data = await this.databaseService.division.findMany({
      where: { company_id, deleted_at: null },
      skip,
      take: perPage,
      select: {
        id: true,
        name: true,
        location: true,
        entry_time: true,
        leave_time: true,
        code: true,
        created_at: true,
        update_at: true,
      },
    });
    return {
      data,
      pagination,
    };
  }

  async findOne({ id, user }: { id: string; user: HeadersOperator }) {
    const result = await this.databaseService.division.findUnique({
      where: { id, deleted_at: null },
    });
    if (!result)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    return result;
  }

  async update({
    id,
    body,
    user,
  }: {
    id: string;
    body: CreateDivisionDto;
    user: HeadersOperator;
  }) {
    const { company_id, ip, user_id } = user;
    const checkDivision = await this.databaseService.division.findUnique({
      where: { id, deleted_at: null },
    });
    if (!checkDivision)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await prisma.division.update({
        where: { id },
        data: { ...body },
      });
      await this.logActivityService.createLogActivity({
        action_type: 'create',
        activity: OPERATOR_ACTIVITY['operator/division'].crete,
        company_id,
        date: new Date(),
        module: 'operator/division',
        new_data: data as object,
        previous_data: checkDivision as object,
        user_id: user_id,
        ip: ip,
      });
      return data;
    });
    return result;
  }

  async remove({ id, user }: { id: string; user: HeadersOperator }) {
    const { company_id, ip, user_id } = user;
    const checkDivision = await this.databaseService.division.findUnique({
      where: { id, deleted_at: null },
    });
    if (!checkDivision)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );

    const result = await this.databaseService.$transaction(async (prisma) => {
      const data = await prisma.division.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
      await this.logActivityService.createLogActivity({
        action_type: 'create',
        activity: OPERATOR_ACTIVITY['operator/division'].crete,
        company_id,
        date: new Date(),
        module: 'operator/division',
        new_data: data as object,
        previous_data: null,
        user_id: user_id,
        ip: ip,
      });
      return data;
    });
    return result;
  }
}
