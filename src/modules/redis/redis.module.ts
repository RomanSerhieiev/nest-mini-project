import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { EClient } from '#common/constants/client.constant';
import { EConfig } from '#src/configs/config.enum';
import { Config, RedisConfig } from '#src/configs/config.type';

import { RedisService } from './services/redis.service';

const redisProvider: Provider = {
  provide: EClient.REDIS,
  useFactory: (configService: ConfigService<Config>): Redis => {
    const redisConfig = configService.get<RedisConfig>(EConfig.REDIS);
    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
