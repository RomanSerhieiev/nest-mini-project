import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EConfig } from '#src/configs/config.enum';
import { AwsConfig, Config } from '#src/configs/config.type';

import { LoggerService } from '../../logger/services/logger.service';
import { EItemType } from '../enums/item-type.enum';

@Injectable()
export class S3Service {
  private readonly awsConfig: AwsConfig;
  private readonly s3Client: S3Client;

  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.awsConfig = this.configService.get<AwsConfig>(EConfig.AWS);
    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.endpoint,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: EItemType,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.originalname);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucket,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: this.awsConfig.acl,
        }),
      );
      return filePath;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucket,
          Key: filePath,
        }),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  private buildPath(itemType: EItemType, itemId: string, fileName: string): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only  template string
  }
}
