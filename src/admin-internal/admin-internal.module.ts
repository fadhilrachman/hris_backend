import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, CompanyModule, AdminModule]
})
export class AdminInternalModule {}
