import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { BrandID } from '#entities/types/id.type';
import { BaseRequestToCreateModelDto } from '#modules/requst-to-create/models/dto/base-request-to-create-model.dto';

export class CreateRequestToCreateModelReqDto extends PickType(BaseRequestToCreateModelDto, [
  'name',
] as const) {
  @ApiProperty({
    description: 'Unique identifier for the brand',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly brandId: BrandID;
}
