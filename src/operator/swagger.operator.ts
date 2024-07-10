import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { DivisionModule } from './division/division.module';

export function setupOperatorSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Operator API')
    .setDescription('Operator API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, AdminModule, EmployeeModule, DivisionModule],
  });
  SwaggerModule.setup('swagger/operator', app, document);
}
