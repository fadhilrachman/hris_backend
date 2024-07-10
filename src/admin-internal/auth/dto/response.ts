import { ApiProperty } from '@nestjs/swagger';

/// SUCCESS RESPONSE
export class SignIn {
  @ApiProperty({ example: 'asdnkdnakjsdnajksdnads_asdasd' })
  access_token: string;
}
export class SuccessSignInDto {
  @ApiProperty({ type: SignIn })
  data: SignIn;
}

/// ERROR RESPONSE

export class MesageSignInUnathorizeDto {
  @ApiProperty({ example: ['Email or password not valid'] })
  data: string[];
}
export class SignInUnathorizeDto {
  @ApiProperty({ type: [MesageSignInUnathorizeDto] })
  errors: MesageSignInUnathorizeDto[];
}
