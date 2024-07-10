import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/lib/response';

class User {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example' })
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '21455' })
  nik: string;
}

export class LogActivity {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example' })
  activity: string;

  @ApiProperty({ example: 'create', enum: ['create', 'update', 'delete'] })
  action_type: string;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  date: Date;

  @ApiProperty({ example: '127.0.0.1' })
  ip: string;

  @ApiProperty({ example: 'admin/example' })
  module: string;

  @ApiProperty({ type: User })
  user: User;
}

export class LogActivitySuccessResponseDto {
  @ApiProperty({ type: [LogActivity] })
  data: LogActivity[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

////////////////////// FIND ONE

export class LogActivityFindOneDto extends LogActivity {
  @ApiProperty({ type: 'object' })
  new_data: object;

  @ApiProperty({ type: 'object' })
  previous_data: object;
}

export class LogActivityFindOneSuccessResponseDto {
  @ApiProperty({ type: LogActivityFindOneDto })
  data: LogActivityFindOneDto;

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}
