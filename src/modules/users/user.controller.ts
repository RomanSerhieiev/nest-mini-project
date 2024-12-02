import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { ApiFile } from '#common/decorators/api-file.decorator';
import { UserID } from '#entities/types/id.type';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { UpdateBrandReqDto } from '../brand/models/dto/req/update-brand.req.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return await this.usersService.findMe(userData.userId);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateBrandReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(userData.userId, dto);
  }

  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData.userId);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: UserID): Promise<UserResDto> {
    return await this.usersService.findOne(userId);
  }

  @Post('me/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, true)
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData.userId, avatar);
  }

  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<any> {
    return await this.usersService.deleteAvatar(userData.userId);
  }
}
