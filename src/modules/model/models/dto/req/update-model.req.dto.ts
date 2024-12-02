import { PartialType, PickType } from '@nestjs/swagger';

import { BaseModelDto } from '#modules/model/models/dto/base-model.dto';

export class UpdateModelReqDto extends PickType(PartialType(BaseModelDto), ['name'] as const) {}
