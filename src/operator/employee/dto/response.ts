import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/lib/response';
import {
  EmployeeEntity,
  EmployeeListEntity,
} from '../entities/employee.entity';

////// MODEL

/////// RESPONSE
export class EmployeeSuccessFindOneResponseDto {
  @ApiProperty({ type: EmployeeEntity })
  data: EmployeeEntity;
}

export class EmployeeSuccessResponseDto {
  @ApiProperty({ type: [EmployeeListEntity] })
  data: EmployeeListEntity[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class SuccessCreateEmployeeResponseDto {
  @ApiProperty({ type: EmployeeEntity })
  data: EmployeeEntity;
}
