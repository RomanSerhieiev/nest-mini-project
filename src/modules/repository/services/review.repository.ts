import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReviewEntity } from '#entities/review.entity';

@Injectable()
export class ReviewRepository extends Repository<ReviewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReviewEntity, dataSource.manager);
  }
}
