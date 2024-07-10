import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateLogActivityDto } from './dto/request';

@Injectable()
export class LogActivityService {
  constructor(private readonly databaseService: DatabaseService) {}

  createLogActivity(data: CreateLogActivityDto) {
    const {
      action_type,
      date,
      module,
      new_data,
      previous_data,
      user_id,
      company_id = null,
      activity,
      ip,
    } = data;
    // const cuy:CreateLogActivityDto={
    //     module:''
    // }
    return this.databaseService.logActivity.create({
      data: {
        activity,
        action_type,
        date,
        module,
        new_data,
        previous_data,
        user_id,
        company_id,
        ip,
      },
    });
  }
}
