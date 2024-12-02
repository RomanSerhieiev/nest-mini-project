import { Module } from '@nestjs/common';

import { RequestToCreateController } from '#modules/requst-to-create/request-to-create.controller';
import { RequestToCreateService } from '#modules/requst-to-create/services/request-to-create.service';

@Module({
  imports: [],
  controllers: [RequestToCreateController],
  providers: [RequestToCreateService],
  exports: [],
})
export class RequestToCreateModule {}
