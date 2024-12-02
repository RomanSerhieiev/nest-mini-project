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

import { RequestToCreateBrandID, RequestToCreateModelID } from '#entities/types/id.type';
import { CurrentUser } from '#modules/auth/decorators/current-user.decorator';
import { Roles } from '#modules/brand/decorators/role.decorator';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { UpdateModelReqDto } from '#modules/model/models/dto/req/update-model.req.dto';
import { CreateRequestToCreateBrandReqDto } from '#modules/requst-to-create/models/dto/req/create-request-to-create-brand.req.dto';
import { CreateRequestToCreateModelReqDto } from '#modules/requst-to-create/models/dto/req/create-request-to-create-model.req.dto';
import { RequestToCreateBrandResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-brand.res.dto';
import { RequestToCreateListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-list.res.dto';
import { RequestToCreateModelResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model.res.dto';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';
import { IUserData } from '#modules/users/models/interfaces/user-data.interface';

import { RequestToCreateService } from './services/request-to-create.service';

@ApiBearerAuth()
@ApiTags('Requests to create')
@Controller('requests')
@UseGuards(RolesGuard)
export class RequestToCreateController {
  constructor(private readonly requestToCreateService: RequestToCreateService) {}

  @Post('brands')
  @ApiConflictResponse({ description: 'Conflict' })
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async createBrand(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateRequestToCreateBrandReqDto,
  ): Promise<RequestToCreateBrandResDto> {
    return await this.requestToCreateService.createBrand(userData, dto);
  }

  @Post('models')
  @ApiConflictResponse({ description: 'Conflict' })
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async createModel(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateRequestToCreateModelReqDto,
  ): Promise<RequestToCreateModelResDto> {
    return await this.requestToCreateService.createModel(userData, dto);
  }

  @Patch('brands/:requestToCreateBrandId')
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async updateBrand(
    @Param('requestToCreateBrandId', ParseUUIDPipe) requestToCreateBrandId: RequestToCreateBrandID,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateModelReqDto,
  ): Promise<RequestToCreateBrandResDto> {
    return await this.requestToCreateService.updateBrand(requestToCreateBrandId, userData, dto);
  }

  @Patch('models/:requestToCreateModelId')
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async updateModel(
    @Param('requestToCreateModelId', ParseUUIDPipe) requestToCreateModelId: RequestToCreateModelID,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateModelReqDto,
  ): Promise<RequestToCreateModelResDto> {
    return await this.requestToCreateService.updateModel(requestToCreateModelId, userData, dto);
  }

  @Delete('brands/:requestToCreateBrandId')
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async removeBrand(
    @Param('requestToCreateBrandId', ParseUUIDPipe) requestToCreateBrandId: RequestToCreateBrandID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.requestToCreateService.removeBrand(requestToCreateBrandId, userData);
  }

  @Delete('models/:requestToCreateModelId')
  @Roles(EUserRole.SUPER_USER, EUserRole.SELLER)
  public async removeModel(
    @Param('requestToCreateModelId', ParseUUIDPipe) requestToCreateModelId: RequestToCreateModelID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.requestToCreateService.removeModel(requestToCreateModelId, userData);
  }

  @Get('all')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER, EUserRole.SELLER)
  public async findAll(@CurrentUser() userData: IUserData): Promise<RequestToCreateListResDto> {
    return await this.requestToCreateService.findAll(userData);
  }

  @Get('brands/:requestToCreateBrandId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER, EUserRole.SELLER)
  public async findOneBrand(
    @CurrentUser() userData: IUserData,
    @Param('requestToCreateBrandId', ParseUUIDPipe) requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandResDto> {
    return await this.requestToCreateService.findOneBrand(requestToCreateBrandId, userData);
  }

  @Get('models/:requestToCreateModelId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER, EUserRole.SELLER)
  public async findOneModel(
    @CurrentUser() userData: IUserData,
    @Param('requestToCreateModelId', ParseUUIDPipe) requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelResDto> {
    return await this.requestToCreateService.findOneModel(requestToCreateModelId, userData);
  }

  @Patch('brands/approve/:requestToCreateBrandId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async approveBrand(
    @Param('requestToCreateBrandId', ParseUUIDPipe) requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandResDto> {
    return await this.requestToCreateService.approveBrand(requestToCreateBrandId);
  }

  @Patch('models/approve/:requestToCreateModelId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async approveModel(
    @Param('requestToCreateModelId', ParseUUIDPipe) requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelResDto> {
    return await this.requestToCreateService.approveModel(requestToCreateModelId);
  }

  @Patch('brands/reject/:requestToCreateBrandId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async rejectBrand(
    @Param('requestToCreateBrandId', ParseUUIDPipe) requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandResDto> {
    return await this.requestToCreateService.rejectBrand(requestToCreateBrandId);
  }

  @Patch('models/reject/:requestToCreateModelId')
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async rejectModel(
    @Param('requestToCreateModelId', ParseUUIDPipe) requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelResDto> {
    return await this.requestToCreateService.rejectModel(requestToCreateModelId);
  }
}
