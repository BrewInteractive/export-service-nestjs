import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = app.get<AppModule>(AppModule);
  });

  it('Should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
