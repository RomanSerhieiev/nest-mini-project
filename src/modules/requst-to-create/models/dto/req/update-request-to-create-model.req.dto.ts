import { PartialType, PickType } from '@nestjs/swagger';

import { BaseRequestToCreateModelDto } from '#modules/requst-to-create/models/dto/base-request-to-create-model.dto';

export class UpdateRequestToCreateModelReqDto extends PickType(
  PartialType(BaseRequestToCreateModelDto),
  ['name'] as const,
) {}
