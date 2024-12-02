import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { getDataSourceOptions } from '#common/helpers/postgres.helper';

import getConfig from './src/configs/config';

dotenv.config({ path: './environments/local.env' });

const postgresConfig = getConfig().postgres;

export default new DataSource(
  getDataSourceOptions(
    postgresConfig,
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ),
);
