import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { AdminInternalModule } from './admin-internal/admin-internal.module';
import { OperatorModule } from './operator/operator.module';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProjectModule, AdminInternalModule, OperatorModule, EmployeeModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
