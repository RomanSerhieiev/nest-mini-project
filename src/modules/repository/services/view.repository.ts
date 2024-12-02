import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementID } from '#entities/types/id.type';
import { ViewEntity } from '#entities/view.entity';

@Injectable()
export class ViewRepository extends Repository<ViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ViewEntity, dataSource.manager);
  }

  public async countByPeriod(
    adId: AdvertisementID,
    period: 'day' | 'week' | 'month',
  ): Promise<number> {
    const qb = this.createQueryBuilder('view').where('view.advertisementId = :adId', { adId });

    const now = new Date();
    let dateFilter: Date;

    switch (period) {
      case 'day':
        dateFilter = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        dateFilter = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        dateFilter = new Date(now.setMonth(now.getMonth() - 1));
        break;
    }

    qb.andWhere('view.created >= :dateFilter', { dateFilter });

    return await qb.getCount();
  }
}
