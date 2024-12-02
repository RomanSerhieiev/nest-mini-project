import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserID } from '#entities/types/id.type';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { IUserData } from '../../users/models/interfaces/user-data.interface';
import { UserMapper } from '../../users/presenters/user.mapper';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async signUp(dto: SignUpReqDto, role?: EUserRole): Promise<AuthResDto> {
    await this.isEmailExist(dto.email);

    if ((dto.role === EUserRole.MODERATOR || dto.role === EUserRole.SUPER_USER) && !role) {
      throw new UnauthorizedException();
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(this.userRepository.create({ ...dto, password }));

    const tokenPair = await this.generateTokenPair(user._id, dto.deviceId);

    return { user: UserMapper.toResDto(user), tokenPair };
  }

  public async verify(): Promise<any> {}

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokenPair = await this.generateTokenPair(user._id, dto.deviceId);

    return { user: UserMapper.toResDto(user), tokenPair };
  }

  public async signOut(userData: IUserData, allDevices?: boolean): Promise<void> {
    if (allDevices) {
      await this.deleteTokenPair(userData.userId);
    } else {
      await this.deleteTokenPair(userData.userId, userData.deviceId);
    }
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    return await this.generateTokenPair(userData.userId, userData.deviceId);
  }

  public async changePassword(): Promise<any> {}

  public async forgotPassword(): Promise<any> {}

  public async setPassword(): Promise<any> {}

  private async isEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }

  private async generateTokenPair(userId: UserID, deviceId: string): Promise<TokenPairResDto> {
    await this.deleteTokenPair(userId, deviceId);

    const tokenPair = await this.tokenService.generateTokenPair({
      userId,
      deviceId,
    });

    await Promise.all([
      this.authCacheService.saveToken(tokenPair.accessToken, userId, deviceId),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          userId,
          deviceId,
          refreshToken: tokenPair.refreshToken,
        }),
      ),
    ]);

    return tokenPair;
  }

  private async deleteTokenPair(userId: UserID, deviceId?: string): Promise<void> {
    if (deviceId) {
      await Promise.all([
        this.authCacheService.deleteToken(userId, deviceId),
        this.refreshTokenRepository.delete({
          userId,
          deviceId,
        }),
      ]);
    } else {
      await Promise.all([
        this.authCacheService.deleteAllTokens(userId),
        this.refreshTokenRepository.delete({
          userId,
        }),
      ]);
    }
  }
}
