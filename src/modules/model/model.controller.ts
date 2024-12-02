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
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { ModelID } from '#entities/types/id.type';
import { Roles } from '#modules/brand/decorators/role.decorator';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { CreateModelReqDto } from '#modules/model/models/dto/req/create-model.req.dto';
import { UpdateModelReqDto } from '#modules/model/models/dto/req/update-model.req.dto';
import { ModelResDto } from '#modules/model/models/dto/res/model.res.dto';
import { ModelListResDto } from '#modules/model/models/dto/res/model-list.res.dto';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

import { ModelService } from './services/model.service';

@ApiBearerAuth()
@ApiTags('Models')
@Controller('models')
@UseGuards(RolesGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @ApiConflictResponse({ description: 'Conflict' })
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async create(@Body() dto: CreateModelReqDto): Promise<ModelResDto> {
    return await this.modelService.create(dto);
  }

  @Patch()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async update(
    @Param('modelId', ParseUUIDPipe) modelId: ModelID,
    @Body() dto: UpdateModelReqDto,
  ): Promise<ModelResDto> {
    return await this.modelService.update(modelId, dto);
  }

  @Delete()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async remove(@Param('modelId', ParseUUIDPipe) modelId: ModelID): Promise<void> {
    await this.modelService.remove(modelId);
  }

  @Get()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async findAll(): Promise<ModelListResDto> {
    return await this.modelService.findAll();
  }

  @Get(':modelId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async findOne(@Param('modelId', ParseUUIDPipe) modelId: ModelID): Promise<ModelResDto> {
    return await this.modelService.findOne(modelId);
  }
}
