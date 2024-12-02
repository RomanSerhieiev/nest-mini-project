import { UserID } from '#entities/types/id.type';
import { UserEntity } from '#entities/user.entity';
import { QueryUserReqDto } from '#modules/users/models/dto/req/query-user.req.dto';
import { UpdateUserReqDto } from '#modules/users/models/dto/req/update-user.req.dto';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';
import { UserListResDto } from '#modules/users/models/dto/res/user-list.res.dto';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

import { IUserData } from '../models/interfaces/user-data.interface';

export class UserMock {
  static entity(props?: Partial<UserEntity>): UserEntity {
    return {
      _id: 'userId' as UserID,
      name: 'name',
      email: 'email',
      password: 'password',
      role: EUserRole.BUYER,
      membership: EUserMembership.BASE,
      created: new Date(),
      updated: new Date(),
      deleted: new Date(),
      ...(props || {}),
    };
  }

  static avatar(props?: Partial<Express.Multer.File>): Express.Multer.File {
    return {
      buffer: undefined,
      destination: '',
      encoding: '',
      fieldname: '',
      filename: '',
      mimetype: '',
      originalname: '',
      path: '',
      size: 0,
      stream: undefined,
      ...(props || {}),
    };
  }

  static queryReqDto(): QueryUserReqDto {
    return {};
  }

  static updateReqDto(): UpdateUserReqDto {
    return {
      name: 'name',
    };
  }

  static resDto(props?: Partial<UserResDto>): UserResDto {
    return {
      _id: 'userId' as UserID,
      name: 'name',
      email: 'email',
      image: null,
      role: EUserRole.BUYER,
      membership: EUserMembership.BASE,
      ...(props || {}),
    };
  }

  static listResDto(props?: Partial<UserListResDto>): UserListResDto {
    return {
      users: [],
      total: 0,
      ...(props || {}),
    };
  }

  static data(props?: Partial<IUserData>): IUserData {
    return {
      userId: 'userId' as UserID,
      email: 'email',
      deviceId: 'deviceId',
      role: EUserRole.BUYER,
      membership: EUserMembership.PREMIUM,
      ...(props || {}),
    };
  }
}
