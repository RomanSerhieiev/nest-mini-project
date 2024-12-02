import { PartialType, PickType } from '@nestjs/swagger';

import { BaseBrandDto } from '#modules/brand/models/dto/base-brand.dto';

export class UpdateBrandReqDto extends PickType(PartialType(BaseBrandDto), ['name'] as const) {}
