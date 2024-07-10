import { PartialType } from '@nestjs/swagger';
import { CreateShiftingDto } from './create-shifting.dto';

export class UpdateShiftingDto extends PartialType(CreateShiftingDto) {}
