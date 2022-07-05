import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './utils/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function initSwagger(app: INestApplication) {
  if (config().environment === 'dev') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Export Service')
      .setVersion(config().version)
      .addSecurity('ApiKey', {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);
  }
}

function initValidationPipe(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: config().cors || true,
    credentials: true,
  });

  initSwagger(app);
  initValidationPipe(app);
  await app.listen(config().port);
}

bootstrap();
