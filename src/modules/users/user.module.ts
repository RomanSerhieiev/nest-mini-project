import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../file-storage/s3.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule, S3Module],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
