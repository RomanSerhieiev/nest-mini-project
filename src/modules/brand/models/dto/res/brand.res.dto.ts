import { PickType } from '@nestjs/swagger';

import { BaseBrandDto } from '#modules/brand/models/dto/base-brand.dto';

export class BrandResDto extends PickType(BaseBrandDto, [
  '_id',
  'name',
  'advertisements',
  'models',
  'requestToCreate',
  'requestsToCreateModel',
] as const) {}
