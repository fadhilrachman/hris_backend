import { ApiProperty } from '@nestjs/swagger';
class Pagination {
  @ApiProperty()
  current: number;

  @ApiProperty()
  total_page: number;

  @ApiProperty()
  total_data: number;
}

export class Admin {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example' })
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '08123465' })
  phone: string;

  @ApiProperty({ example: 'id' })
  company_id: string;

  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   created_at: string;

  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   updated_at: string;
}

export class AdminSuccessResponseDto {
  @ApiProperty({ type: [Admin] })
  data: Admin[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class SuccessCreateAdminResponseDto {
  @ApiProperty({ type: Admin })
  data: Admin;
}

///// ERROR RESPONSE
export class MesageAdminErrorDuplicate {
  @ApiProperty({ example: ['User already exists'] })
  email: string[];
}
export class AdminErrorDuplicateDto {
  @ApiProperty({ type: [MesageAdminErrorDuplicate] })
  errors: MesageAdminErrorDuplicate[];
}
