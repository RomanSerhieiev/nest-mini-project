import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from '#modules/brand/guards/role.guard';
import { HealthService } from '#modules/health/services/health.service';

import { HealthController } from './health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    HealthService,
  ],
  exports: [],
})
export class HealthModule {}
