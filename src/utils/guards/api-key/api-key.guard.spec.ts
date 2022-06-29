import { ApiKeyGuard } from './api-key.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import config from '../../config';

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
      providers: [ApiKeyGuard],
    }).compile();

    apiKeyGuard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('Should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });

  it('Api key should be approved', async () => {
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'x-api-key': config().apiKey,
          },
        }),
      })),
    } as any;

    await expect(apiKeyGuard.canActivate(context)).toEqual(true);
  });

  it('Api key should be not approved', async () => {
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'x-api-key': config().apiKey + 'brewww',
          },
        }),
      })),
    } as any;

    if (config().apiKey)
      await expect(apiKeyGuard.canActivate(context)).toEqual(false);
    else await expect(apiKeyGuard.canActivate(context)).toEqual(true);
  });
});
