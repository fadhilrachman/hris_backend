import { ApiProperty } from '@nestjs/swagger';

export class RequestSignInDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
