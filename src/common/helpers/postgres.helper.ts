import { DataSourceOptions } from 'typeorm';

import { PostgresConfig } from '#src/configs/config.type';

export const getDataSourceOptions = (
  postgresConfig: PostgresConfig,
  entities: string,
  migrations: string,
): DataSourceOptions => ({
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.user,
  password: postgresConfig.password,
  database: postgresConfig.name,
  entities: [entities],
  migrations: [migrations],
  synchronize: false,
  migrationsRun: true,
});
