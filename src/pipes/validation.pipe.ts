import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { errorHandler } from '../lib/response';
// @Injectable()
export class ValidationPipeCustom implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    const finallyResponseError = errors.map((val) => {
      return {
        [val.property]: Object.values(val.constraints),
      };
    });

    if (errors.length > 0) {
      throw new HttpException(
        errorHandler({ errors: finallyResponseError }),
        400,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
