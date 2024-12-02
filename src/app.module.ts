import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from '#common/filters/global-exception.filter';
import { AdModule } from '#modules/advertisement/ad.module';
import { AuthModule } from '#modules/auth/auth.module';
import { BrandModule } from '#modules/brand/brand.module';
import { AppConfigModule } from '#modules/config/conig.module';
import { HealthModule } from '#modules/health/health.module';
import { LoggerModule } from '#modules/logger/logger.module';
import { ModelModule } from '#modules/model/model.module';
import { PostgresModule } from '#modules/postgres/postgres.module';
import { RedisModule } from '#modules/redis/redis.module';
import { RepositoryModule } from '#modules/repository/repository.module';
import { RequestToCreateModule } from '#modules/requst-to-create/request-to-create.module';
import { UserModule } from '#modules/users/user.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    PostgresModule,
    RedisModule,
    RepositoryModule,

    AdModule,
    AuthModule,
    BrandModule,
    HealthModule,
    ModelModule,
    RequestToCreateModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
