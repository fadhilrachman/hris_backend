import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { AdminInternalModule } from './admin-internal/admin-internal.module';
import { OperatorModule } from './operator/operator.module';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminMiddleware } from './middleware/admin-middleware';
import { LogActivityModule } from './log-activity/log-activity.module';

@Module({
  imports: [
    ProjectModule,
    AdminInternalModule,
    OperatorModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
    EmployeeModule,
    DatabaseModule,
    LogActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes(
      {
        path: 'admin-internal/admin',
        method: RequestMethod.ALL,
      },
      { path: 'admin-internal/admin/:user_id', method: RequestMethod.ALL },

      {
        path: 'admin-internal/company',
        method: RequestMethod.ALL,
      },
      {
        path: 'admin-internal/company/:idCompany',
        method: RequestMethod.ALL,
      },
    );
  }
}
