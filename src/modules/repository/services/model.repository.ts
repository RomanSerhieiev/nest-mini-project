import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { ModelEntity } from '#entities/model.entity';
import { BrandID, ModelID } from '#entities/types/id.type';

@Injectable()
export class ModelRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }

  public async findById(modelId: ModelID): Promise<ModelEntity> {
    const qb = await this.getQb();

    qb.where('model._id = :modelId', { modelId });

    return await qb.getOne();
  }

  public async findByIdAndBrand(brandId: BrandID, modelId: ModelID): Promise<ModelEntity> {
    const qb = await this.getQb();

    qb.where('model._id = :modelId', { modelId });
    qb.andWhere('model.brandId = :brandId', { brandId });

    return await qb.getOne();
  }

  private async getQb(): Promise<SelectQueryBuilder<ModelEntity>> {
    const qb = this.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.brand', 'brand');
    qb.leftJoinAndSelect('model.advertisements', 'advertisements');
    qb.leftJoinAndSelect('model.requestToCreate', 'requestToCreate');

    return qb;
  }
}
