import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { EReviewStatus } from '#modules/advertisement/models/enums/review-status.enum';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { ReviewID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.REVIEWS)
export class ReviewEntity extends IdCreatedUpdatedDeleted<ReviewID> {
  @Column('enum', { enum: EReviewStatus, default: EReviewStatus.PENDING })
  status: EReviewStatus;

  @Column('boolean')
  isTestDrive: boolean;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.reviews)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  advertisementId: UserID;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.reviews)
  @JoinColumn({ name: 'advertisementId' })
  advertisement: AdvertisementEntity;
}
