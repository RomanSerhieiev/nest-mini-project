import { PickType } from '@nestjs/swagger';

import { BaseRequestToCreateBrandDto } from '#modules/requst-to-create/models/dto/base-request-to-create-brand.dto';

export class CreateRequestToCreateBrandReqDto extends PickType(BaseRequestToCreateBrandDto, [
  'name',
] as const) {}
