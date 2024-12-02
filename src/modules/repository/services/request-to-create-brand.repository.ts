import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { RequestToCreateBrandEntity } from '#entities/request-to-create-brand.entity';
import { RequestToCreateBrandID, UserID } from '#entities/types/id.type';

@Injectable()
export class RequestToCreateBrandRepository extends Repository<RequestToCreateBrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RequestToCreateBrandEntity, dataSource.manager);
  }

  public async findById(
    requestToCreateBrandId: RequestToCreateBrandID,
  ): Promise<RequestToCreateBrandEntity> {
    const qb = await this.getQb();

    qb.where('requestToCreateBrand._id = :requestToCreateBrandId', { requestToCreateBrandId });

    return await qb.getOne();
  }

  public async findByUser(userId: UserID): Promise<[RequestToCreateBrandEntity[], number]> {
    const qb = await this.getQb();

    qb.andWhere('user._id = :userId', { userId });

    return await qb.getManyAndCount();
  }

  public async findAll(): Promise<[RequestToCreateBrandEntity[], number]> {
    const qb = await this.getQb();

    return await qb.getManyAndCount();
  }

  private async getQb(): Promise<SelectQueryBuilder<RequestToCreateBrandEntity>> {
    const qb = this.createQueryBuilder('requestToCreateBrand');
    qb.leftJoinAndSelect('requestToCreateBrand.brand', 'brand');
    qb.leftJoinAndSelect('brand.models', 'brandModels');
    qb.leftJoinAndSelect('requestToCreateBrand.user', 'user');

    return qb;
  }
}
