import { PickType } from '@nestjs/swagger';

import { BaseAdDto } from '#modules/advertisement/models/dto/base-ad.dto';

export class AdResDto extends PickType(BaseAdDto, [
  '_id',
  'title',
  'description',
  'price',
  'currency',
  'year',
  'city',
  'region',
  'failedAttempts',
  'isAvailable',
  'image',
  'views',
  'reviews',
  'dialogues',
  'user',
  'brand',
  'model',
] as const) {
  readonly prices?: {
    USD: number;
    EUR: number;
    UAH: number;
  };
}
