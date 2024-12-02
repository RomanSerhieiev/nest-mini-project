import { MockType } from '#common/types/mock.type';

import { AuthCacheService } from '../services/auth-cache.service';

export const authCacheServiceMock: MockType<AuthCacheService> = {
  saveToken: jest.fn(),
  isAccessTokenExist: jest.fn(),
  deleteToken: jest.fn(),
  deleteAllTokens: jest.fn(),
};
