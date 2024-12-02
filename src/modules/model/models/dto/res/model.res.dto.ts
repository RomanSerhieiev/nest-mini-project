import { PickType } from '@nestjs/swagger';

import { BaseModelDto } from '#modules/model/models/dto/base-model.dto';

export class ModelResDto extends PickType(BaseModelDto, [
  '_id',
  'name',
  'advertisements',
  // 'brand',
] as const) {}
