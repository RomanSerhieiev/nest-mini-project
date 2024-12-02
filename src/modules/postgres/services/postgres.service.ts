import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { getDataSourceOptions } from '#common/helpers/postgres.helper';
import { EConfig } from '#src/configs/config.enum';
import { Config, PostgresConfig } from '#src/configs/config.type';

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get<PostgresConfig>(EConfig.POSTGRES);
    return getDataSourceOptions(
      postgresConfig,
      path.join(process.cwd(), 'dist', 'src', 'database', 'entities', '*.entity.js'),
      path.join(process.cwd(), 'dist', 'src', 'database', 'migrations', '*.js'),
    );
  }
}
