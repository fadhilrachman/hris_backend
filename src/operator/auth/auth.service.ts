import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      where: { email, role: 'operator' },
    });
    console.log({ checkEmail });

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
      user_id: checkEmail.id,
      name: checkEmail.name,
      role: checkEmail.role,
      company_id: checkEmail.company_id,
    };
    const jwt = await this.jwtService.signAsync(payloadJwt);

    return {
      access_token: jwt,
    };
  }
}
