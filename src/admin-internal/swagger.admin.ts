import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';

export function setupAdminSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, CompanyModule, AdminModule],
  });
  SwaggerModule.setup('swagger/admin-internal', app, document);
}
