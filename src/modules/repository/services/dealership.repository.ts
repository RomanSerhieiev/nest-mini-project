import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DealershipEntity } from '#entities/dealership.entity';

@Injectable()
export class DealershipRepository extends Repository<DealershipEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DealershipEntity, dataSource.manager);
  }
}
