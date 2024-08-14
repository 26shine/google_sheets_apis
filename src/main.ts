import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);

  const port = 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger UI is available on: http://localhost:${port}/api/swagger`,
  );
}

bootstrap();
