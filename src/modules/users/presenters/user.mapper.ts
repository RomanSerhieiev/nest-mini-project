import { UserEntity } from '#entities/user.entity';
import { QueryUserReqDto } from '#modules/users/models/dto/req/query-user.req.dto';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';
import { UserListResDto } from '#modules/users/models/dto/res/user-list.res.dto';

import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../models/interfaces/user-data.interface';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image ? `${process.env.AWS_S3_ENDPOINT}/${user.image}` : null,
      role: user.role,
      membership: user.membership,
      refreshTokens: user.refreshTokens
        ? user.refreshTokens.map((refreshToken) => refreshToken._id)
        : [],
      advertisements: user.advertisements
        ? user.advertisements.map((advertisement) => advertisement._id)
        : [],
      views: user.views ? user.views.map((view) => view._id) : [],
      reviews: user.reviews ? user.reviews.map((review) => review._id) : [],
      outputDialogues: user.outputDialogues
        ? user.outputDialogues.map((outputDialogue) => outputDialogue._id)
        : [],
      inputDialogues: user.inputDialogues
        ? user.inputDialogues.map((inputDialogue) => inputDialogue._id)
        : [],
      messages: user.messages ? user.messages.map((message) => message._id) : [],
      brandRequests: user.brandRequests
        ? user.brandRequests.map((brandRequest) => brandRequest._id)
        : [],
      modelRequests: user.modelRequests
        ? user.modelRequests.map((modelRequest) => modelRequest._id)
        : [],
      dealership: user.dealership ? user.dealership._id : null,
    };
  }

  public static toResDtoList(
    users: UserEntity[],
    total: number,
    query: QueryUserReqDto,
  ): UserListResDto {
    return { users: users.map(this.toResDto), total, ...query };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): IUserData {
    return {
      userId: user._id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
      role: user.role,
      membership: user.membership,
    };
  }
}
