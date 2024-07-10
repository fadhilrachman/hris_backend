import { Query } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
// import { IsOptional,  } from 'class-validator';

// export class RequestParamsAdminDto {
//   // @Query('page')
//   @ApiPropertyOptional({ example: 1 })
//   @IsOptional()
//   page: string;

//   @ApiPropertyOptional({ example: 10 })
//   @IsOptional()
//   per_page: string;
// }

export class CreateAdminDto {
  @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ example: 'example', maxLength: 100 })
  name: string;

  @Length(6, 100)
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @Length(6, 100)
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;

  user_id: string;
  ip: string;
}
