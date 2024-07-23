import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/lib/response';

export class Division {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'example', maxLength: 100 })
  name: string;

  @ApiProperty({ example: '012013291230912390,1923091230123' })
  location: string;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  entry_time: Date;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  leave_time: Date;

  @ApiProperty({ example: '009920' })
  code: string;
  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   created_at: string;

  //   @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  //   updated_at: string;
}

export class DivisionSuccessResponseDto {
  @ApiProperty({ type: [Division] })
  data: Division[];

  @ApiProperty({ type: Pagination, nullable: true })
  pagination?: Pagination | null;
}

export class SuccessCreateDivisionResponseDto {
  @ApiProperty({ type: Division })
  data: Division;
}
