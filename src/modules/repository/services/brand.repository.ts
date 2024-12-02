import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { BrandEntity } from '#entities/brand.entity';
import { BrandID } from '#entities/types/id.type';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }

  public async findById(brandId: BrandID): Promise<BrandEntity> {
    const qb = await this.getQb();

    qb.where('brand._id = :brandId', { brandId });

    return await qb.getOne();
  }

  private async getQb(): Promise<SelectQueryBuilder<BrandEntity>> {
    const qb = this.createQueryBuilder('brand');
    qb.leftJoinAndSelect('brand.models', 'models');
    qb.leftJoinAndSelect('brand.requestsToCreateModel', 'requestsToCreateModel');
    qb.leftJoinAndSelect('brand.advertisements', 'advertisements');
    qb.leftJoinAndSelect('brand.requestToCreate', 'requestToCreate');

    return qb;
  }
}
