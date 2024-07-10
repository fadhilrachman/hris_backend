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

export class CreateCompanuDto {
  //   @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ example: 'example', maxLength: 100 })
  name: string;

  //   @Length(6, 100)
  @IsNotEmpty()
  @ApiProperty({ example: '012013291230912390,1923091230123' })
  location: string;

  @Length(6, 100)
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  phone: string;

  @Length(6, 100)
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  ///// OWNER IFORMATION
  @ApiProperty({ example: 'example' })
  owner_name: string;

  @ApiProperty({ example: 'example' })
  owner_email: string;

  /////  MAIN CONTACT INFORMATION
  @ApiProperty({ example: 'example' })
  contact_name: string;

  @ApiProperty({ example: '213123132' })
  contact_phone: string;

  @ApiProperty({ example: 'example@gmail.com' })
  contact_email: string;

  @ApiProperty({ example: 'frontend' })
  contact_postion: string;

  @ApiProperty({ example: 'example' })
  description: string;

  code: string;
  user_id: string;
  ip: string;
}
