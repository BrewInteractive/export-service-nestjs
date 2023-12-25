import { Test, TestingModule } from '@nestjs/testing';

import { ApiKeyGuard } from './api-key.guard';
import config from '../../config';
import { faker } from '@faker-js/faker';

jest.mock('../../config', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyGuard],
    }).compile();

    apiKeyGuard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('Should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });

  it('Should operate without an api key', async () => {
    (config as jest.Mock).mockImplementation(() => ({
      apiKey: null,
    }));

    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(),
    } as any;

    expect(apiKeyGuard.canActivate(context)).toEqual(true);
  });

  it('Api key should be approved', async () => {
    const apiKey = faker.string.alpha();

    (config as jest.Mock).mockImplementation(() => ({
      apiKey,
    }));

    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'x-api-key': apiKey,
          },
        }),
      })),
    } as any;

    expect(apiKeyGuard.canActivate(context)).toEqual(true);
  });

  it('Api key should be not approved', async () => {
    (config as jest.Mock).mockImplementation(() => ({
      apiKey: faker.string.alpha(8),
    }));

    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'x-api-key': faker.string.alpha(4),
          },
        }),
      })),
    } as any;

    expect(apiKeyGuard.canActivate(context)).toEqual(false);
  });

  it('If the api key is not sent, it should be approved', async () => {
    (config as jest.Mock).mockImplementation(() => ({
      apiKey: faker.string.alpha(),
    }));

    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      })),
    } as any;

    expect(apiKeyGuard.canActivate(context)).toEqual(false);
  });
});
