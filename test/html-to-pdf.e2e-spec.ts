import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Html To Pdf (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('When the body is sent empty, it should give BadRequest error.', () => {
    return request(app.getHttpServer())
      .post('/html-to-pdf')
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'fileName should not be null or undefined',
          'fileName must match ^[a-zA-Z0-9_-]*$ regular expression',
          'fileName must be a string',
          'fileName should not be empty',
          'type should not be null or undefined',
          'type must be a valid enum value',
          'type must be a string',
          'type should not be empty',
          'format should not be null or undefined',
          'format must be a valid enum value',
          'format must be a string',
        ],
        error: 'Bad Request',
      });
  });

  it('The sent Website Url must be converted to PDF', () => {
    return request(app.getHttpServer())
      .post('/html-to-pdf')
      .send({
        url: 'https://google.com.tr',
        type: 'url',
        fileName: 'hello-word',
        format: 'a4',
      })
      .expect(201)
      .expect('Content-Type', 'application/pdf');
  });

  it('The sent HTML must be converted to PDF', () => {
    return request(app.getHttpServer())
      .post('/html-to-pdf')
      .send({
        html: '<h1>Hello Word</h1>',
        type: 'html',
        fileName: 'hello-word',
        format: 'a4',
      })
      .expect(201)
      .expect('Content-Type', 'application/pdf');
  });
});
