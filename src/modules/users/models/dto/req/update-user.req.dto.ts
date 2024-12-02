import { PartialType, PickType } from '@nestjs/swagger';

import { BaseUserDto } from '#modules/users/models/dto/base-user.dto';

export class UpdateUserReqDto extends PickType(PartialType(BaseUserDto), ['name'] as const) {}
