import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAdDto } from '#modules/advertisement/models/dto/base-ad.dto';

export class UpdateAdReqDto extends PickType(PartialType(BaseAdDto), [
  'title',
  'description',
  'price',
  'year',
  'city',
  'region',
] as const) {}
