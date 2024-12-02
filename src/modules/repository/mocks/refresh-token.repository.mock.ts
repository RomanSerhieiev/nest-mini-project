import { MockType } from '#common/types/mock.type';

import { RefreshTokenRepository } from '../services/refresh-token.repository';
import { commonRepositoryMock } from './common.repository.mock';

export const refreshTokenRepositoryMock: MockType<RefreshTokenRepository> = {
  ...commonRepositoryMock,
  isRefreshTokenExist: jest.fn(),
};
