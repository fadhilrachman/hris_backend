import { ApiProperty } from '@nestjs/swagger';

export class MessageError {
  @ApiProperty({ example: ['Data not found'] })
  data: string[];
}
export class NotFoundError {
  @ApiProperty({ type: [MessageError] })
  errors: MessageError[];
}

export class HeadersOperator {
  user_id: string;
  name: string;
  role: string;
  company_id: string;

  ip: string;
}
