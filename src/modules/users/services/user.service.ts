import { Injectable } from '@nestjs/common';

import { UserID } from '#entities/types/id.type';
import { UpdateUserReqDto } from '#modules/users/models/dto/req/update-user.req.dto';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';

import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { EItemType } from '../../file-storage/enums/item-type.enum';
import { S3Service } from '../../file-storage/services/s3.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../presenters/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findMe(userId: UserID): Promise<UserResDto> {
    const user = await this.userRepository.findById(userId);
    return UserMapper.toResDto(user);
  }

  public async updateMe(userId: UserID, dto: UpdateUserReqDto): Promise<UserResDto> {
    const user = await this.userRepository.findById(userId);
    this.userRepository.merge(user, dto);
    const updatedUser = await this.userRepository.save(user);
    return UserMapper.toResDto(updatedUser);
  }

  public async removeMe(userId: UserID): Promise<void> {
    await this.userRepository.update({ _id: userId }, { deleted: new Date() });
    await this.authCacheService.deleteAllTokens(userId);
    await this.refreshTokenRepository.delete({ userId });
  }

  public async uploadAvatar(userId: UserID, avatar: Express.Multer.File): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const pathToAvatar = await this.s3Service.uploadFile(avatar, EItemType.IMAGE, userId);
    if (user.image) {
      await this.s3Service.deleteFile(user.image);
    }
    await this.userRepository.save({ ...user, image: pathToAvatar });
  }

  public async deleteAvatar(userId: UserID): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user.image) {
      await this.s3Service.deleteFile(user.image);
      await this.userRepository.save({ ...user, image: null });
    }
  }

  public async findOne(userId: UserID): Promise<UserResDto> {
    const user = await this.userRepository.findById(userId);
    return UserMapper.toResDto(user);
  }
}
