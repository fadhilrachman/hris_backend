import { Module } from '@nestjs/common';
import { AttendanceManagementService } from './attendance-management.service';
import { AttendanceManagementController } from './attendance-management.controller';

@Module({
  controllers: [AttendanceManagementController],
  providers: [AttendanceManagementService],
})
export class AttendanceManagementModule {}
