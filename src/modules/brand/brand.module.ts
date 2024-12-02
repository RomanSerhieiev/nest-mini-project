import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { BrandController } from '#modules/brand/brand.controller';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { BrandService } from '#modules/brand/services/brand.service';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    BrandService,
  ],
  exports: [],
})
export class BrandModule {}
