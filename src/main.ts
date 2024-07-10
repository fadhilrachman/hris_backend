import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdminSwagger } from './admin-internal/swagger.admin';
// import { setupEmployeeSwagger } from './employee/swagger.employee';
import { setupOperatorSwagger } from './operator/swagger.operator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /// ADMIN INTERNAL SWAGGER
  setupAdminSwagger(app);

  /// EMPLOYEE SWAGGER
  // setupEmployeeSwagger(app);

  /// OPERATOR SWAGGER
  setupOperatorSwagger(app);

  await app.listen(3000);
}
bootstrap();
