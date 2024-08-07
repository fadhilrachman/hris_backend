import { ApiProperty } from '@nestjs/swagger';

export class EmployeeListEntity {
  @ApiProperty({ example: 'example' })
  id: string;

  @ApiProperty({ example: 'example' })
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '1129393393' })
  nik: string;

  @ApiProperty({ example: 'https://lasdkmsdk.com' })
  avatar: string;

  @ApiProperty({ example: 'frontend' })
  job_title: string;

  division?: {
    id: string;
    name: string;
  } | null;
}
export class EmployeeEntity extends EmployeeListEntity {
  @ApiProperty({ example: 'garut' })
  address: string;

  @ApiProperty({ example: '8319393' })
  phone: string;

  @ApiProperty({ example: '21-09-04' })
  dob: Date;

  @ApiProperty({ example: 'garut' })
  pob: string;

  @ApiProperty({ example: 'indonesia' })
  region: string;
}
