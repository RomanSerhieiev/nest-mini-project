import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';

import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  tokenPair: TokenPairResDto;
  user: UserResDto;
}
