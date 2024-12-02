import { QueryUserReqDto } from '#modules/users/models/dto/req/query-user.req.dto';

import { UserResDto } from './user.res.dto';

export class UserListResDto extends QueryUserReqDto {
  users: UserResDto[];
  total: number;
}
