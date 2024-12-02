import { PickType } from '@nestjs/swagger';

import { BaseModelDto } from '#modules/model/models/dto/base-model.dto';

export class CreateModelReqDto extends PickType(BaseModelDto, ['name', 'brand'] as const) {}
