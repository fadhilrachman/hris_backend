import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';
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
}
