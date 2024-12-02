import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ERequestStatus } from '#common/enums/request-status.enum';
import { RequestToCreateBrandEntity } from '#entities/request-to-create-brand.entity';
import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';
import { RequestToCreateBrandID, RequestToCreateModelID } from '#entities/types/id.type';
import { BrandRepository } from '#modules/repository/services/brand.repository';
import { ModelRepository } from '#modules/repository/services/model.repository';
import { RequestToCreateBrandRepository } from '#modules/repository/services/request-to-create-brand.repository';
import { RequestToCreateModelRepository } from '#modules/repository/services/request-to-create-model.repository';
import { UserRepository } from '#modules/repository/services/user.repository';
import { CreateRequestToCreateBrandReqDto } from '#modules/requst-to-create/models/dto/req/create-request-to-create-brand.req.dto';
import { CreateRequestToCreateModelReqDto } from '#modules/requst-to-create/models/dto/req/create-request-to-create-model.req.dto';
import { UpdateRequestToCreateBrandReqDto } from '#modules/requst-to-create/models/dto/req/update-request-to-create-brand.req.dto';
import { UpdateRequestToCreateModelReqDto } from '#modules/requst-to-create/models/dto/req/update-request-to-create-model.req.dto';
import { RequestToCreateBrandResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-brand.res.dto';
import { RequestToCreateListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-list.res.dto';
import { RequestToCreateModelResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model.res.dto';
import { RequestToCreateMapper } from '#modules/requst-to-create/presenters/request-to-create.mapper';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';
import { IUserData } from '#modules/users/models/interfaces/user-data.interface';

@Injectable()
export class RequestToCreateService {
  constructor(
    private readonly requestToCreateBrandRepository: RequestToCreateBrandRepository,
    private readonly requestToCreateModelRepository: RequestToCreateModelRepository,
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createBrand(
    userData: IUserData,
    dto: CreateRequestToCreateBrandReqDto,
  ): Promise<RequestToCreateBrandResDto> {
    await this.isBrandExist(dto.name);

    const user = await this.userRepository.findOneBy({ _id: userData.userId });
    const requestToCreateBrand = await this.requestToCreateBrandRepository.save(
      this.requestToCreateBrandRepository.create({ name: dto.name, user }),
    );

    return RequestToCreateMapper.toBrandResDto(requestToCreateBrand);
  }

  public async createModel(
    userData: IUserData,
    dto: CreateRequestToCreateModelReqDto,
  ): Promise<RequestToCreateModelResDto> {
    await this.isModelExist(dto.name);

    const user = await this.userRepository.findOneBy({ _id: userData.userId });
    const brand = await this.brandRepository.findById(dto.brandId);
    const requestToCreateModel = await this.requestToCreateModelRepository.save(
      this.requestToCreateModelRepository.create({
        name: dto.name,
        brand,
        user,
      }),
    );

    return RequestToCreateMapper.toModelResDto(requestToCreateModel);
  }

  public async updateBrand(
    requestToCreateBrandId: RequestToCreateBrandID,
    userData: IUserData,
    dto: UpdateRequestToCreateBrandReqDto,
  ): Promise<RequestToCreateBrandResDto> {
    const requestToCreateBrand =
      await this.requestToCreateBrandRepository.findById(requestToCreateBrandId);

    if (userData.role === EUserRole.SELLER && requestToCreateBrand.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    if (
      userData.role === EUserRole.SELLER &&
      requestToCreateBrand.status !== ERequestStatus.PENDING
    ) {
      throw new UnauthorizedException();
    }

    await this.isBrandExist(dto.name);

    this.requestToCreateBrandRepository.merge(requestToCreateBrand, dto);
    const updatedRequestToCreateBrand =
      await this.requestToCreateBrandRepository.save(requestToCreateBrand);

    return RequestToCreateMapper.toBrandResDto(updatedRequestToCreateBrand);
  }

  public async updateModel(
    requestToCreateModelId: RequestToCreateModelID,
    userData: IUserData,
    dto: UpdateRequestToCreateModelReqDto,
  ): Promise<RequestToCreateModelResDto> {
    const requestToCreateModel =
      await this.requestToCreateModelRepository.findById(requestToCreateModelId);

    if (userData.role === EUserRole.SELLER && requestToCreateModel.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    if (
      userData.role === EUserRole.SELLER &&
      requestToCreateModel.status !== ERequestStatus.PENDING
    ) {
      throw new UnauthorizedException();
    }

    await this.isModelExist(dto.name);

    this.requestToCreateModelRepository.merge(requestToCreateModel, dto);
    const updatedRequestToCreateModel =
      await this.requestToCreateModelRepository.save(requestToCreateModel);

    return RequestToCreateMapper.toModelResDto(updatedRequestToCreateModel);
  }

  public async removeBrand(
    requestToCreateBrandId: RequestToCreateBrandID,
    userData: IUserData,
  ): Promise<void> {
    const requestToCreateBrand = await this.requestToCreateBrandRepository.findOneBy({
      _id: requestToCreateBrandId,
    });

    if (userData.role === EUserRole.SELLER && requestToCreateBrand.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    if (
      userData.role === EUserRole.SELLER &&
      requestToCreateBrand.status !== ERequestStatus.PENDING
    ) {
      throw new UnauthorizedException();
    }

    await this.requestToCreateBrandRepository.update(
      { _id: requestToCreateBrandId },
      { deleted: new Date() },
    );
  }

  public async removeModel(
    requestToCreateModelId: RequestToCreateModelID,
    userData: IUserData,
  ): Promise<void> {
    const requestToCreateModel = await this.requestToCreateModelRepository.findOneBy({
      _id: requestToCreateModelId,
    });

    if (userData.role === EUserRole.SELLER && requestToCreateModel.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    if (
      userData.role === EUserRole.SELLER &&
      requestToCreateModel.status !== ERequestStatus.PENDING
    ) {
      throw new UnauthorizedException();
    }

    await this.requestToCreateModelRepository.update(
      { _id: requestToCreateModelId },
      { deleted: new Date() },
    );
  }

  public async findAll(userData: IUserData): Promise<RequestToCreateListResDto> {
    let brandRequests: RequestToCreateBrandEntity[] = [];
    let modelRequests: RequestToCreateModelEntity[] = [];
    let brandTotal: number;
    let modelTotal: number;

    switch (userData.role) {
      case EUserRole.SELLER:
        [brandRequests, brandTotal] = await this.requestToCreateBrandRepository.findByUser(
          userData.userId,
        );
        [modelRequests, modelTotal] = await this.requestToCreateModelRepository.findByUser(
          userData.userId,
        );
        break;

      case EUserRole.SUPER_USER:
      case EUserRole.MODERATOR:
        [brandRequests, brandTotal] = await this.requestToCreateBrandRepository.findAll();
        [modelRequests, modelTotal] = await this.requestToCreateModelRepository.findAll();
        break;
    }

    const brands = RequestToCreateMapper.toBrandResDtoList(brandRequests, brandTotal);
    const models = RequestToCreateMapper.toModelResDtoList(modelRequests, modelTotal);

    return { brands, models };
  }

  public async findOneBrand(
    requestToCreateBrandId: RequestToCreateBrandID,
    userData: IUserData,
  ): Promise<RequestToCreateBrandResDto> {
    const requestToCreateBrand =
      await this.requestToCreateBrandRepository.findById(requestToCreateBrandId);

    if (userData.role === EUserRole.SELLER && requestToCreateBrand.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    return RequestToCreateMapper.toBrandResDto(requestToCreateBrand);
  }

  public async findOneModel(
    requestToCreateModelId: RequestToCreateModelID,
    userData: IUserData,
  ): Promise<RequestToCreateModelResDto> {
    const requestToCreateModel =
      await this.requestToCreateModelRepository.findById(requestToCreateModelId);

    if (userData.role === EUserRole.SELLER && requestToCreateModel.userId !== userData.userId) {
      throw new UnauthorizedException();
    }

    return RequestToCreateMapper.toModelResDto(requestToCreateModel);
  }

  public async approveBrand(
    requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandResDto> {
    const requestToCreateBrand =
      await this.requestToCreateBrandRepository.findById(requestToCreateBrandId);

    await this.isBrandExist(requestToCreateBrand.name);
    const brand = await this.brandRepository.save(
      this.brandRepository.create({
        name: requestToCreateBrand.name,
        requestToCreate: requestToCreateBrand,
      }),
    );

    this.requestToCreateBrandRepository.merge(requestToCreateBrand, {
      status: ERequestStatus.APPROVED,
      brand,
    });
    const updatedRequestToCreateBrand =
      await this.requestToCreateBrandRepository.save(requestToCreateBrand);

    return RequestToCreateMapper.toBrandResDto(updatedRequestToCreateBrand);
  }

  public async approveModel(
    requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelResDto> {
    const requestToCreateModel =
      await this.requestToCreateModelRepository.findById(requestToCreateModelId);

    await this.isModelExist(requestToCreateModel.name);
    const model = await this.modelRepository.save(
      this.modelRepository.create({
        name: requestToCreateModel.name,
        requestToCreate: requestToCreateModel,
        brand: requestToCreateModel.brand,
      }),
    );

    this.requestToCreateModelRepository.merge(requestToCreateModel, {
      status: ERequestStatus.APPROVED,
      model,
    });
    const updatedRequestToCreateModel =
      await this.requestToCreateModelRepository.save(requestToCreateModel);

    return RequestToCreateMapper.toModelResDto(updatedRequestToCreateModel);
  }

  public async rejectBrand(
    requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandResDto> {
    const requestToCreateBrand =
      await this.requestToCreateBrandRepository.findById(requestToCreateBrandId);

    this.requestToCreateBrandRepository.merge(requestToCreateBrand, {
      status: ERequestStatus.REJECTED,
    });
    const updatedRequestToCreateBrand =
      await this.requestToCreateBrandRepository.save(requestToCreateBrand);

    return RequestToCreateMapper.toBrandResDto(updatedRequestToCreateBrand);
  }

  public async rejectModel(
    requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelResDto> {
    const requestToCreateModel =
      await this.requestToCreateModelRepository.findById(requestToCreateModelId);

    this.requestToCreateModelRepository.merge(requestToCreateModel, {
      status: ERequestStatus.REJECTED,
    });
    const updatedRequestToCreateModel =
      await this.requestToCreateModelRepository.save(requestToCreateModel);

    return RequestToCreateMapper.toModelResDto(updatedRequestToCreateModel);
  }

  private async isBrandExist(name: string) {
    const brand = await this.brandRepository.findOneBy({ name });
    if (brand) {
      throw new Error('Brand already exists');
    }
  }

  private async isModelExist(name: string) {
    const model = await this.modelRepository.findOneBy({ name });
    if (model) {
      throw new Error('Model already exists');
    }
  }
}
