import { Module } from '@nestjs/common';

import { ModelController } from '#modules/model/model.controller';
import { ModelService } from '#modules/model/services/model.service';

@Module({
  imports: [],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [],
})
export class ModelModule {}
