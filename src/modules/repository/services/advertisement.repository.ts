import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { AdvertisementID, ModelID, UserID } from '#entities/types/id.type';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  public async findAll(): Promise<[AdvertisementEntity[], number]> {
    const qb = await this.getQb();

    return await qb.getManyAndCount();
  }

  public async findById(adId: AdvertisementID): Promise<AdvertisementEntity> {
    const qb = await this.getQb();

    qb.where('ad._id = :adId', { adId });

    return await qb.getOne();
  }

  public async findByIdAndUser(
    adId: AdvertisementID,
    userId: UserID,
  ): Promise<AdvertisementEntity> {
    const qb = await this.getQb();

    qb.where('ad._id = :adId', { adId });
    qb.andWhere('ad.userId = :userId', { userId });

    return await qb.getOne();
  }

  public async findByModel(modelId: ModelID): Promise<AdvertisementEntity[]> {
    const qb = await this.getQb();

    qb.where('ad.modelId = :modelId', { modelId });

    return await qb.getMany();
  }

  private async getQb(): Promise<SelectQueryBuilder<AdvertisementEntity>> {
    const qb = this.createQueryBuilder('ad');
    qb.leftJoinAndSelect('ad.views', 'views');
    qb.leftJoinAndSelect('ad.reviews', 'reviews');
    qb.leftJoinAndSelect('ad.dialogues', 'dialogues');
    qb.leftJoinAndSelect('ad.user', 'user');
    qb.leftJoinAndSelect('user.advertisements', 'advertisements');
    qb.leftJoinAndSelect('ad.brand', 'brand');
    qb.leftJoinAndSelect('brand.requestToCreate', 'requestToCreate');
    qb.leftJoinAndSelect('ad.model', 'model');

    return qb;
  }
}
