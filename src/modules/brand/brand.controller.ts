import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BrandID } from '#entities/types/id.type';
import { Roles } from '#modules/brand/decorators/role.decorator';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { UpdateBrandReqDto } from '#modules/brand/models/dto/req/update-brand.req.dto';
import { BrandResDto } from '#modules/brand/models/dto/res/brand.res.dto';
import { BrandListResDto } from '#modules/brand/models/dto/res/brand-list.res.dto';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

import { BrandService } from './services/brand.service';

@ApiBearerAuth()
@ApiTags('Brands')
@Controller('brands')
@UseGuards(RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Patch()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async update(
    @Param('brandId', ParseUUIDPipe) brandId: BrandID,
    @Body() dto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.update(brandId, dto);
  }

  @Delete()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async remove(@Param('brandId', ParseUUIDPipe) brandId: BrandID): Promise<void> {
    await this.brandService.remove(brandId);
  }

  @Get()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async findAll(): Promise<BrandListResDto> {
    return await this.brandService.findAll();
  }

  @Get(':brandId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async findOne(@Param('brandId', ParseUUIDPipe) brandId: BrandID): Promise<BrandResDto> {
    return await this.brandService.findOne(brandId);
  }
}
