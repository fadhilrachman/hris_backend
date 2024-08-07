import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { errorHandler, errorResponse } from 'src/lib/response';

@Injectable()
export class OperatorMiddleware implements NestMiddleware {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('INI MIDDLEWARE OPERATOR');

    try {
      const token = req.headers['authorization'];

      if (!token)
        throw new ForbiddenException({
          errors: [{ token: ['token is not valid'] }],
        });
      const finallyToken = token.split(' ')[1];

      const checkAccesToken = await this.jwtService.verify(finallyToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      console.log({ checkAccesToken });

      if (checkAccesToken.role != 'operator' && !checkAccesToken.company_id)
        throw new ForbiddenException({
          errors: [{ access: ['You cannot access this feature'] }],
        });

      req['user'] = { ...checkAccesToken, ip: req.ip };

      // req.body.ip = req.ip;
      // req.body.user_id = checkAccesToken.id;
      // req.body.company_id = checkAccesToken.company_id;
      next();
    } catch (error) {
      errorResponse({
        errors: error,
        status: error.status || 403,
        response: error.response || {
          errors: [{ token: ['Token is not valid'] }],
        },
      });
    }
  }
}
