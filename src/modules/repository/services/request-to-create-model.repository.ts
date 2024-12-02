import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';
import { RequestToCreateModelID, UserID } from '#entities/types/id.type';

@Injectable()
export class RequestToCreateModelRepository extends Repository<RequestToCreateModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RequestToCreateModelEntity, dataSource.manager);
  }

  public async findById(
    requestToCreateModelId: RequestToCreateModelID,
  ): Promise<RequestToCreateModelEntity> {
    const qb = await this.getQb();

    qb.where('requestToCreateModel._id = :requestToCreateModelId', { requestToCreateModelId });

    return await qb.getOne();
  }

  public async findByUser(userId: UserID): Promise<[RequestToCreateModelEntity[], number]> {
    const qb = await this.getQb();

    qb.where('user._id = :userId', { userId });

    return await qb.getManyAndCount();
  }

  public async findAll(): Promise<[RequestToCreateModelEntity[], number]> {
    const qb = await this.getQb();

    return await qb.getManyAndCount();
  }

  private async getQb(): Promise<SelectQueryBuilder<RequestToCreateModelEntity>> {
    const qb = this.createQueryBuilder('requestToCreateModel');
    qb.leftJoinAndSelect('requestToCreateModel.brand', 'brand');
    qb.leftJoinAndSelect('brand.models', 'brandModels');
    qb.leftJoinAndSelect('brand.requestToCreate', 'requestToCreate');
    qb.leftJoinAndSelect('requestToCreateModel.model', 'model');
    qb.leftJoinAndSelect('requestToCreateModel.user', 'user');

    return qb;
  }
}
