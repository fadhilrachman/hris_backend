import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RequestSignInDto } from './dto/request';
import { DatabaseService } from 'src/database/database.service';
import { errorHandler, errorResponse } from 'src/lib/response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async signIn(createAuthDto: RequestSignInDto) {
    const { email, password } = createAuthDto;

    // VALIDATION EMAIL
    const checkEmail = await this.databaseService.user.findFirst({
      where: { email },
    });
    if (!checkEmail)
      throw new UnauthorizedException(
        errorHandler({
          errors: [{ data: ['Email or password not valid'] }],
        }),
      );

    // VALIDATION PASSWORD
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword)
      throw new UnauthorizedException(
        errorHandler({
          errors: [{ data: ['Email or password not valid'] }],
        }),
      );

    // CREATE JWT TOKEN
    const payloadJwt = {
      id: checkEmail.id,
      name: checkEmail.name,
      role: checkEmail.role,
    };
    const jwt = await this.jwtService.signAsync(payloadJwt);

    return {
      access_token: jwt,
    };
  }
}
