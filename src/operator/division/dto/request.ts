import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DefaultRequestOperator } from 'src/lib/request-dto';

export class CreateDivisionDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'example', maxLength: 50 })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123445,12355', maxLength: 100 })
  location: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  entry_time: Date;

  @IsNotEmpty()
  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  leave_time: Date;

  code: string;
}
