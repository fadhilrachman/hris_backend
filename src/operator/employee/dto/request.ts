import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateEmployeeDto {
  @Length(2, 100)
  @IsNotEmpty()
  @ApiProperty({ example: 'example' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'example' })
  email: string;

  @Length(16, 20)
  @IsNotEmpty()
  @ApiProperty({
    example: '1234567890123456',
    description: 'nik will be used as a password',
  })
  nik: string;

  @ApiProperty({ example: 'https://avatar.png' })
  avatar?: string;

  @ApiProperty({ example: 'garut' })
  address?: string;

  @ApiProperty({ example: '12345678' })
  phone?: string;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  dob?: Date;

  @ApiProperty({ example: 'garut' })
  pob?: string;
}

export class ChangePasswordEmployeeDto {
  @ApiProperty({ example: '123456' })
  password: string;
}
