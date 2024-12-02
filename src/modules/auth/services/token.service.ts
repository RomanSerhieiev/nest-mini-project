import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';

import { EConfig } from '#src/configs/config.enum';
import { Config, JwtConfig } from '#src/configs/config.type';

import { ETokenType } from '../models/enums/token-type.enum';
import { IJwtPayload } from '../models/interfaces/jwt-payload.interface';
import { ITokenPair } from '../models/interfaces/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>(EConfig.JWT);
  }

  public async generateTokenPair(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  public async verifyToken(token: string, type: ETokenType): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (e) {
      throw new UnauthorizedException(`Invalid token ${e}`);
    }
  }

  private getSecret(type: ETokenType): string {
    let secret: string;
    switch (type) {
      case ETokenType.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;

      case ETokenType.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;

      default:
        throw new Error('Unknown token type');
    }

    return secret;
  }
}
