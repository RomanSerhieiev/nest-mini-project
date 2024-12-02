import { PickType } from '@nestjs/swagger';

import { BaseBrandDto } from '#modules/brand/models/dto/base-brand.dto';

export class CreateBrandReqDto extends PickType(BaseBrandDto, ['name'] as const) {}
