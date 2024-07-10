import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DatabaseService } from 'src/database/database.service';
import { createPagination } from 'src/lib/pagination';
import { CreateCompanuDto } from './dto/request';
import { createCode } from 'src/lib/create-code';
import { LogActivityService } from 'src/log-activity/log-activity.service';
import { ADMIN_INTERNAL_ACTIVITY } from 'src/lib/constants';
import { errorHandler } from 'src/lib/response';

@Injectable()
export class CompanyService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logActivityService: LogActivityService,
  ) {}
  async create(createCompanyDto: CreateCompanuDto) {
    const { ip, user_id, ...payload } = createCompanyDto;
    const length = await this.databaseService.company.count();
    const code = createCode({
      code: 'admin-internal/company',
      length: length,
    });

    const result = await this.databaseService.$transaction(async (prisma) => {
      const company = await prisma.company.create({
        data: { ...payload, code },
      });
      await this.logActivityService.createLogActivity({
        action_type: 'create',
        activity: ADMIN_INTERNAL_ACTIVITY['admin_internal/company'].crete,
        company_id: null,
        date: new Date(),
        module: 'admin-internal/company',
        new_data: { ...payload, code, id: company.id },
        previous_data: null,
        user_id,
        ip,
      });
      return company;
    });

    return result;
  }

  async findAll({
    page = 1,
    perPage = 10,
    search,
  }: {
    page: number;
    perPage: number;
    search?: string;
  }) {
    let filter: {
      deleted_at: null;
      name?: {
        contains: string;
      };
    } = { deleted_at: null };

    // FILTER SEARCH
    if (search)
      filter.name = {
        contains: search,
      };

    /// PAGINATION
    const skip = (page - 1) * perPage;
    const pagination = createPagination({
      page,
      per_page: perPage,
      total_data: await this.databaseService.company.count({
        where: filter,
      }),
    });

    return {
      data: await this.databaseService.company.findMany({
        where: filter,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          name: true,
          location: true,
          phone: true,
          email: true,
          owner_name: true,
          owner_email: true,
          description: true,
          code: true,
        },
        skip,
        take: perPage,
      }),
      pagination,
    };
  }

  async findOne(id: string) {
    return this.databaseService.company.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        name: true,
        location: true,
        phone: true,
        email: true,
        code: true,
        owner_name: true,
        owner_email: true,
        description: true,
        contact_name: true,
        contact_phone: true,
        contact_email: true,
        contact_postion: true,
        created_at: true,
        update_at: true,
      },
    });
  }

  async update(id: string, createCompanyDto: CreateCompanuDto) {
    const { ip, user_id, ...payload } = createCompanyDto;
    const checkCompany = await this.databaseService.company.findUnique({
      where: { id },
    });
    if (!checkCompany)
      throw new NotFoundException(
        errorHandler({ errors: [{ data: ['Data not found'] }] }),
      );
    const result = await this.databaseService.$transaction(async (prisma) => {
      const company = await prisma.company.update({
        where: { id },
        data: { ...payload },
      });
      await this.logActivityService.createLogActivity({
        action_type: 'update',
        activity: ADMIN_INTERNAL_ACTIVITY['admin_internal/company'].update,
        company_id: null,
        date: new Date(),
        module: 'admin-internal/company',
        new_data: company as object,
        previous_data: checkCompany as object,
        user_id,
        ip,
      });
      return company;
    });

    return result;
  }

  async remove(id: string, data: { ip: string; user_id: string }) {
    const { user_id, ip } = data;
    const result = await this.databaseService.$transaction(async (prisma) => {
      const company = await prisma.company.update({
        where: { id, deleted_at: null },
        data: { deleted_at: new Date() },
      });

      await this.logActivityService.createLogActivity({
        action_type: 'delete',
        activity: ADMIN_INTERNAL_ACTIVITY['admin_internal/company'].delete,
        company_id: null,
        date: new Date(),
        module: 'admin-internal/company',
        new_data: company as object,
        previous_data: null,
        user_id,
        ip,
      });
      return company;
    });
    return result;
  }
}
