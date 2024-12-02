import { PickType } from '@nestjs/swagger';

import { BaseUserDto } from '#modules/users/models/dto/base-user.dto';

export class UserResDto extends PickType(BaseUserDto, [
  '_id',
  'name',
  'email',
  'image',
  'role',
  'membership',
  'refreshTokens',
  'advertisements',
  'views',
  'reviews',
  'outputDialogues',
  'inputDialogues',
  'messages',
  'brandRequests',
  'modelRequests',
  'dealership',
] as const) {}
