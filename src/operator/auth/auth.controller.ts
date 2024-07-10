import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidationPipeCustom } from 'src/pipes/validation.pipe';
import { SignIn, SignInUnathorizeDto, SuccessSignInDto } from './dto/response';
import { RequestSignInDto } from './dto/request';
import {
  errorResponse,
  sucessResponse,
  SucessResponseType,
} from 'src/lib/response';
import { Request } from 'express';

@ApiTags('Auth')
@UsePipes(ValidationPipeCustom)
@Controller('operator/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({ type: SuccessSignInDto })
  @ApiBody({ type: RequestSignInDto })
  @ApiUnauthorizedResponse({ type: SignInUnathorizeDto })
  async signIn(
    @Body() createAuthDto: RequestSignInDto,
    @Req() request: Request,
  ): Promise<SucessResponseType<SignIn>> {
    try {
      const result = await this.authService.signIn(createAuthDto);

      return sucessResponse({ data: result });
    } catch (error) {
      errorResponse({ errors: error });
    }
  }
}
