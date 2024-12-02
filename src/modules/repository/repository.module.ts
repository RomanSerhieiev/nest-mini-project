import { Global, Module } from '@nestjs/common';

import { AdvertisementRepository } from '#modules/repository/services/advertisement.repository';
import { BrandRepository } from '#modules/repository/services/brand.repository';
import { DealershipRepository } from '#modules/repository/services/dealership.repository';
import { DialogueRepository } from '#modules/repository/services/dialogue.repository';
import { MessageRepository } from '#modules/repository/services/message.repository';
import { ModelRepository } from '#modules/repository/services/model.repository';
import { RequestToCreateBrandRepository } from '#modules/repository/services/request-to-create-brand.repository';
import { RequestToCreateModelRepository } from '#modules/repository/services/request-to-create-model.repository';
import { ReviewRepository } from '#modules/repository/services/review.repository';
import { ViewRepository } from '#modules/repository/services/view.repository';

import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  AdvertisementRepository,
  BrandRepository,
  DealershipRepository,
  DialogueRepository,
  MessageRepository,
  ModelRepository,
  RefreshTokenRepository,
  RequestToCreateBrandRepository,
  RequestToCreateModelRepository,
  ReviewRepository,
  UserRepository,
  ViewRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
