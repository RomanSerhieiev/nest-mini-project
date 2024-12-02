import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AdController } from '#modules/advertisement/ad.controller';
import { AdService } from '#modules/advertisement/services/ad.service';
import { CurrencyService } from '#modules/advertisement/services/currency.service';

@Module({
  imports: [HttpModule],
  controllers: [AdController],
  providers: [CurrencyService, AdService],
  exports: [CurrencyService],
})
export class AdModule {}
