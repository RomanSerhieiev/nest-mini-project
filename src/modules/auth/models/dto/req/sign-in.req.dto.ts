import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base-auth.dto';

export class SignInReqDto extends PickType(BaseAuthDto, [
  'email',
  'password',
  'deviceId',
] as const) {}
