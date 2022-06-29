import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './utils/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
