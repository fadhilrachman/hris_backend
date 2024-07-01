import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';

export function setupEmployeeSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Employee API')
    .setDescription('Employee API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule],
  });
  SwaggerModule.setup('swagger/employee', app, document);
}
