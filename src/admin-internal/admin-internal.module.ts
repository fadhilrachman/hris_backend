import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';
import { LogActivityModule } from './log-activity/log-activity.module';

@Module({
  imports: [AuthModule, CompanyModule, AdminModule, LogActivityModule]
})
export class AdminInternalModule {}
