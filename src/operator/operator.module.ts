import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { DivisionModule } from './division/division.module';
import { AdminModule } from './admin/admin.module';
import { ShiftingModule } from './shifting/shifting.module';
import { AttendanceManagementModule } from './attendance-management/attendance-management.module';

@Module({
  imports: [AuthModule, EmployeeModule, DivisionModule, AdminModule, ShiftingModule, AttendanceManagementModule],
})
export class OperatorModule {}
