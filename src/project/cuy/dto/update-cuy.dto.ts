import { PartialType } from '@nestjs/swagger';
import { CreateCuyDto } from './create-cuy.dto';

export class UpdateCuyDto extends PartialType(CreateCuyDto) {}
