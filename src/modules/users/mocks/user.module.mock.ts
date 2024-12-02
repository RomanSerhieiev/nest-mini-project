import { Provider } from '@nestjs/common';

import { authCacheServiceMock } from '../../auth/mocks/auth-cache.service.mock';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { s3ServiceMock } from '../../file-storage/mocks/s3.service.mock';
import { S3Service } from '../../file-storage/services/s3.service';
import { refreshTokenRepositoryMock } from '../../repository/mocks/refresh-token.repository.mock';
import { userRepositoryMock } from '../../repository/mocks/user.repository.mock';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../services/user.service';
import { userServiceMock } from './user.service.mock';

export const userProvidersMock: Provider[] = [
  {
    provide: UserService,
    useValue: userServiceMock,
  },
  {
    provide: S3Service,
    useValue: s3ServiceMock,
  },
  {
    provide: AuthCacheService,
    useValue: authCacheServiceMock,
  },
  {
    provide: UserRepository,
    useValue: userRepositoryMock,
  },
  {
    provide: RefreshTokenRepository,
    useValue: refreshTokenRepositoryMock,
  },
];
