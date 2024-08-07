import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class Pagination {
  @ApiProperty()
  current: number;

  @ApiProperty()
  total_page: number;

  @ApiProperty()
  total_data: number;
}
export class SucessResponseType<T> {
  data: T | T[];
  pagination?: Pagination | null;
}

interface ErrorResponseType {
  errors: {
    [key: string]: string[];
  }[];
}
export const sucessResponse = <T>({
  data,
  pagination,
}: SucessResponseType<T>): SucessResponseType<T> => {
  return {
    data,
    pagination,
  };
};

export const sucessWriteResponse = <T>({
  data,
}: SucessResponseType<T>): SucessResponseType<T> => {
  return {
    data,
  };
};
export const errorHandler = ({
  errors,
}: ErrorResponseType): ErrorResponseType => {
  return {
    errors,
  };
};

export const errorResponse = ({
  errors,
  status: forceStatus,
  response: forceRsponse,
}: {
  errors: HttpException;
  status?: number;
  response?: any;
}) => {
  const errorResponse =
    forceRsponse || errors?.getResponse() || 'Internal Server Error';
  const status = forceStatus || errors?.getStatus() || 500;

  switch (true) {
    case status == 400:
      throw new BadRequestException(errorResponse);
    case status == 404:
      throw new NotFoundException(errorResponse);
    case status == 401:
      throw new UnauthorizedException(errorResponse);
    case status == 403:
      throw new ForbiddenException(errorResponse);

    default:
      throw Error('Internal server error');
  }
};
