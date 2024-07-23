import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/lib/response';

////// MODEL
export class EmployeeDto {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example', maxLength: 100 })
  name: string;

  @ApiProperty({ example: '0120132912309123' })
  nik: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: 'https://example.png' })
  avatar: string;
}

export class EmployeeFindOneDto extends EmployeeDto {
  @ApiProperty({ example: '31423525' })
  code: string;

  @ApiProperty({ example: 'garut' })
  address: string;

  @ApiProperty({ example: '1231234' })
  phone: string;

  @ApiProperty({ example: 'garut' })
  pob: string;

  @ApiProperty({ example: 'garut' })
  dob: string;
}

/////// RESPONSE
export class EmployeeSuccessFindOneResponseDto {
  @ApiProperty({ type: EmployeeFindOneDto })
  data: EmployeeFindOneDto;

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class EmployeeSuccessResponseDto {
  @ApiProperty({ type: [EmployeeDto] })
  data: EmployeeDto[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class SuccessCreateEmployeeResponseDto {
  @ApiProperty({ type: EmployeeDto })
  data: EmployeeDto;
}
