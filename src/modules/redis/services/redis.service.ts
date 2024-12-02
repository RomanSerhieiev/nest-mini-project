import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { EClient } from '#common/constants/client.constant';

@Injectable()
export class RedisService {
  constructor(
    @Inject(EClient.REDIS)
    private readonly redisClient: Redis,
  ) {}

  public async addOneToSet(hash: string, value: string): Promise<number> {
    return await this.redisClient.sadd(hash, value);
  }

  public async remOneFromSet(key: string, setMember: string): Promise<number> {
    return await this.redisClient.srem(key, setMember);
  }

  public async deleteByKey(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  public async deleteByKeys(keys: string[]): Promise<void> {
    if (keys.length > 0) {
      await this.redisClient.del(keys);
    }
  }

  public async sMembers(key: string): Promise<string[]> {
    return await this.redisClient.smembers(key);
  }

  public async expire(key: string, time: number): Promise<number> {
    return await this.redisClient.expire(key, time);
  }

  public async keys(pattern: string): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      this.redisClient.keys(pattern, (err, keys) => {
        if (err) reject(err);
        else resolve(keys);
      });
    });
  }
}
