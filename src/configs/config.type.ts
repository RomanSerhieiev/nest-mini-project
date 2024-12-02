import { ObjectCannedACL } from '@aws-sdk/client-s3';

export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type AdminConfig = {
  email: string;
  password: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  name: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type AwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  acl: ObjectCannedACL;
  endpoint: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
