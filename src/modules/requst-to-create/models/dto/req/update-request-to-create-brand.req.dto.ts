import { PartialType, PickType } from '@nestjs/swagger';

import { BaseRequestToCreateBrandDto } from '#modules/requst-to-create/models/dto/base-request-to-create-brand.dto';

export class UpdateRequestToCreateBrandReqDto extends PickType(
  PartialType(BaseRequestToCreateBrandDto),
  ['name'] as const,
) {}
