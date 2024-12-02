import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { UserID } from '#entities/types/id.type';
import { UserEntity } from '#entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findById(userId: UserID): Promise<UserEntity> {
    const qb = await this.getQb();

    qb.where('user._id = :userId', { userId });

    return await qb.getOne();
  }

  private async getQb(): Promise<SelectQueryBuilder<UserEntity>> {
    const qb = this.createQueryBuilder('user');
    qb.leftJoinAndSelect('user.refreshTokens', 'refreshTokens');
    qb.leftJoinAndSelect('user.advertisements', 'advertisements');
    qb.leftJoinAndSelect('user.views', 'views');
    qb.leftJoinAndSelect('user.reviews', 'reviews');
    qb.leftJoinAndSelect('user.outputDialogues', 'outputDialogues');
    qb.leftJoinAndSelect('user.inputDialogues', 'inputDialogues');
    qb.leftJoinAndSelect('user.messages', 'messages');
    qb.leftJoinAndSelect('user.brandRequests', 'brandRequests');
    qb.leftJoinAndSelect('user.modelRequests', 'modelRequests');
    qb.leftJoinAndSelect('user.dealership', 'dealership');

    return qb;
  }
}
