import { PickType } from '@nestjs/swagger';

import { BaseRequestToCreateModelDto } from '#modules/requst-to-create/models/dto/base-request-to-create-model.dto';

export class RequestToCreateModelResDto extends PickType(BaseRequestToCreateModelDto, [
  '_id',
  'name',
  'brand',
  'status',
  'model',
  'user',
] as const) {}
