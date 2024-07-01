import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';

export function setupOperatorSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Operator API')
    .setDescription('Operator API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule],
  });
  SwaggerModule.setup('swagger/operator', app, document);
}
