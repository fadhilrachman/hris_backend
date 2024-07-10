import { ApiProperty } from '@nestjs/swagger';
class Pagination {
  @ApiProperty()
  current: number;

  @ApiProperty()
  total_page: number;

  @ApiProperty()
  total_data: number;
}

export class Company {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example', maxLength: 100 })
  name: string;

  @ApiProperty({ example: '012013291230912390,1923091230123' })
  location: string;

  @ApiProperty({ example: '123456' })
  phone: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  ///// OWNER IFORMATION
  @ApiProperty({ example: 'example' })
  owner_name: string;

  @ApiProperty({ example: 'example' })
  owner_email: string;

  @ApiProperty({ example: 'example' })
  description: string;

  @ApiProperty({ example: '009920' })
  code: string;
  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   created_at: string;

  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   updated_at: string;
}

export class CompanyDetail extends Company {
  @ApiProperty({ example: 'example' })
  contact_name: string;

  @ApiProperty({ example: '213123132' })
  contact_phone: string;

  @ApiProperty({ example: 'example@gmail.com' })
  contact_email: string;

  @ApiProperty({ example: 'frontend' })
  contact_postion: string;
}

export class CompanySuccessFindOneResponseDto {
  @ApiProperty({ type: CompanyDetail })
  data: CompanyDetail;
}

export class CompanySuccessResponseDto {
  @ApiProperty({ type: [Company] })
  data: Company[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class SuccessCreateCompanyResponseDto {
  @ApiProperty({ type: Company })
  data: Company;
}

///// ERROR RESPONSE
export class MesageCompanyErrorDuplicate {
  @ApiProperty({ example: ['User already exists'] })
  email: string[];
}
export class CompanyErrorDuplicateDto {
  @ApiProperty({ type: [MesageCompanyErrorDuplicate] })
  errors: MesageCompanyErrorDuplicate[];
}
