import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdvertisementID } from '#entities/types/id.type';
import { Memberships } from '#modules/advertisement/decorators/membership.decorator';
import { MembershipsGuard } from '#modules/advertisement/guards/membership.guard';
import { CreateAdReqDto } from '#modules/advertisement/models/dto/req/create-ad.req.dto';
import { UpdateAdReqDto } from '#modules/advertisement/models/dto/req/update-ad.req.dto';
import { AdResDto } from '#modules/advertisement/models/dto/res/ad.res.dto';
import { AdListResDto } from '#modules/advertisement/models/dto/res/ad-list.res.dto';
import { AdPremiumResDto } from '#modules/advertisement/models/dto/res/ad-premium.res.dto';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';
import { Roles } from '#modules/brand/decorators/role.decorator';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';
import { IUserData } from '#modules/users/models/interfaces/user-data.interface';

import { AdService } from './services/ad.service';

@ApiBearerAuth()
@ApiTags('Advertisements')
@Controller('ads')
@UseGuards(RolesGuard, MembershipsGuard)
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  @Roles(EUserRole.SELLER, EUserRole.SUPER_USER)
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateAdReqDto,
  ): Promise<AdResDto> {
    return await this.adService.create(userData.userId, dto);
  }

  @Patch(':adId')
  @Roles(EUserRole.SELLER, EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async update(
    @Param('adId', ParseUUIDPipe) adId: AdvertisementID,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdReqDto,
  ): Promise<AdResDto> {
    return await this.adService.update(adId, userData.userId, dto);
  }

  @Delete(':adId')
  @Roles(EUserRole.SELLER, EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async remove(
    @Param('adId', ParseUUIDPipe) adId: AdvertisementID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.adService.remove(adId, userData.userId);
  }

  @Get()
  public async findAll(@CurrentUser() userData: IUserData): Promise<AdListResDto> {
    return await this.adService.findAll(userData);
  }

  @Get(':adId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('adId', ParseUUIDPipe) adId: AdvertisementID,
  ): Promise<AdResDto> {
    return await this.adService.findOne(userData, adId);
  }

  @Get('premium/:adId')
  @Roles(EUserRole.SELLER, EUserRole.MODERATOR, EUserRole.SUPER_USER)
  @Memberships(EUserMembership.PREMIUM)
  public async findOnePremium(
    @Param('adId', ParseUUIDPipe) adId: AdvertisementID,
    @CurrentUser() userData: IUserData,
  ): Promise<AdPremiumResDto> {
    return await this.adService.findOnePremium(userData.userId, adId);
  }
}
