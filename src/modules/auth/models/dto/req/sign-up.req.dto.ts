import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base-auth.dto';

export class SignUpReqDto extends PickType(BaseAuthDto, [
  'email',
  'password',
  'name',
  'role',
  'deviceId',
] as const) {}
