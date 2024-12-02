import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/entity.model';
import { AdvertisementID, UserID, ViewID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.VIEWS)
export class ViewEntity extends IdCreated<ViewID> {
  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.views)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  advertisementId: AdvertisementID;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.views)
  @JoinColumn({ name: 'advertisementId' })
  advertisement: AdvertisementEntity;
}
