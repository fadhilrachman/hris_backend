import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceManagementDto } from './create-attendance-management.dto';

export class UpdateAttendanceManagementDto extends PartialType(CreateAttendanceManagementDto) {}
