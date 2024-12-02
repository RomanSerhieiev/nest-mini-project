import { PickType } from '@nestjs/swagger';

import { BaseRequestToCreateBrandDto } from '#modules/requst-to-create/models/dto/base-request-to-create-brand.dto';

export class RequestToCreateBrandResDto extends PickType(BaseRequestToCreateBrandDto, [
  '_id',
  'name',
  'status',
  'brand',
  'user',
] as const) {}
