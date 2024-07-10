import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createPagination } from 'src/lib/pagination';

@Injectable()
export class LogActivityService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll({ page = 1, perPage = 10 }: { page: number; perPage: number }) {
    /// PAGINATION
    const skip = (page - 1) * perPage;
    const pagination = createPagination({
      page,
      per_page: perPage,
      total_data: await this.databaseService.logActivity.count({
        where: { company_id: null },
      }),
    });

    return {
      data: await this.databaseService.logActivity.findMany({
        where: { company_id: null, deleted_at: null },
        skip,
        take: perPage,
        orderBy: {
          date: 'desc',
        },
        select: {
          id: true,
          activity: true,
          action_type: true,
          date: true,
          ip: true,
          module: true,
          user: {
            // include:
            select: {
              id: true,
              name: true,
              nik: true,
              email: true,
            },
          },
        },
      }),
      pagination,
    };
  }

  findOne(id: string) {
    return this.databaseService.logActivity.findUnique({
      where: { id },
      select: {
        id: true,
        activity: true,
        action_type: true,
        date: true,
        ip: true,
        module: true,
        new_data: true,
        previous_data: true,
        user: {
          // include:
          select: {
            id: true,
            name: true,
            nik: true,
            email: true,
          },
        },
      },
    });
  }
}
