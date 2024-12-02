import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BrandEntity } from '#entities/brand.entity';
import { DialogueEntity } from '#entities/dialogue.entity';
import { ModelEntity } from '#entities/model.entity';
import { ReviewEntity } from '#entities/review.entity';
import { UserEntity } from '#entities/user.entity';
import { ViewEntity } from '#entities/view.entity';
import { ECurrency } from '#modules/advertisement/models/enums/currency.enum';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { AdvertisementID, BrandID, ModelID, UserID } from './types/id.type';

@Entity(EEntity.ADVERTISEMENTS)
export class AdvertisementEntity extends IdCreatedUpdatedDeleted<AdvertisementID> {
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('enum', { enum: ECurrency })
  currency: ECurrency;

  @Column('int')
  year: number;

  @Column('text')
  city: string;

  @Column('text')
  region: string;

  @Column('int', { default: 0 })
  failedAttempts: number;

  @Column('boolean', { default: true })
  isAvailable: boolean;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => ViewEntity, (entity) => entity.advertisement)
  views?: ViewEntity[];

  @OneToMany(() => ReviewEntity, (entity) => entity.advertisement)
  reviews?: ReviewEntity[];

  @OneToMany(() => DialogueEntity, (entity) => entity.advertisement)
  dialogues?: DialogueEntity[];

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  brandId: BrandID;
  @ManyToOne(() => BrandEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @Column('uuid')
  modelId: ModelID;
  @ManyToOne(() => ModelEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'modelId' })
  model: ModelEntity;
}
