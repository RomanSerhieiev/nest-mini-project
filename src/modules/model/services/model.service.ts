import { Injectable } from '@nestjs/common';

import { ModelID } from '#entities/types/id.type';
import { CreateModelReqDto } from '#modules/model/models/dto/req/create-model.req.dto';
import { UpdateModelReqDto } from '#modules/model/models/dto/req/update-model.req.dto';
import { ModelResDto } from '#modules/model/models/dto/res/model.res.dto';
import { ModelListResDto } from '#modules/model/models/dto/res/model-list.res.dto';
import { ModelMapper } from '#modules/model/presenters/model.mapper';
import { BrandRepository } from '#modules/repository/services/brand.repository';
import { ModelRepository } from '#modules/repository/services/model.repository';

@Injectable()
export class ModelService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  public async create(dto: CreateModelReqDto): Promise<ModelResDto> {
    await this.isModelExist(dto.name);
    const brand = await this.brandRepository.findById(dto.brand);
    const model = await this.modelRepository.save(
      this.modelRepository.create({ name: dto.name, brand }),
    );

    return ModelMapper.toResDto(model);
  }

  public async update(modelId: ModelID, dto: UpdateModelReqDto): Promise<ModelResDto> {
    await this.isModelExist(dto.name);
    const model = await this.modelRepository.findOneBy({ _id: modelId });
    this.modelRepository.merge(model, dto);
    const updatedModel = await this.modelRepository.save(model);

    return ModelMapper.toResDto(updatedModel);
  }

  public async remove(modelId: ModelID): Promise<void> {
    await this.modelRepository.update({ _id: modelId }, { deleted: new Date() });
  }

  public async findAll(): Promise<ModelListResDto> {
    const [models, total] = await this.modelRepository.findAndCount();
    return ModelMapper.toResDtoList(models, total);
  }

  public async findOne(modelId: ModelID): Promise<ModelResDto> {
    const model = await this.modelRepository.findOneBy({ _id: modelId });
    return ModelMapper.toResDto(model);
  }

  private async isModelExist(name: string) {
    const model = await this.modelRepository.findOneBy({ name });
    if (model) {
      throw new Error('Model already exists');
    }
  }
}
