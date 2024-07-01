import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DirectorateModule } from './directorate/directorate.module';

@Module({
  imports: [AuthModule, DirectorateModule]
})
export class OperatorModule {}
