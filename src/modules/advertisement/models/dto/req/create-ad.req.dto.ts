import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { BrandID, ModelID } from '#entities/types/id.type';
import { BaseAdDto } from '#modules/advertisement/models/dto/base-ad.dto';

export class CreateAdReqDto extends PickType(BaseAdDto, [
  'title',
  'description',
  'price',
  'currency',
  'year',
  'city',
  'region',
] as const) {
  @ApiProperty({
    description: 'Brand associated with the advertisement',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly brand: BrandID;

  @ApiProperty({
    description: 'Model associated with the advertisement',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly model: ModelID;
}
