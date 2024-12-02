import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { BrandEntity } from '#entities/brand.entity';
import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { BrandID, ModelID } from './types/id.type';

@Entity(EEntity.MODELS)
export class ModelEntity extends IdCreatedUpdatedDeleted<ModelID> {
  @Column('text', { unique: true })
  name: string;

  @OneToOne(() => RequestToCreateModelEntity, (entity) => entity.model)
  requestToCreate: RequestToCreateModelEntity;

  @OneToMany(() => AdvertisementEntity, (entity) => entity.model)
  advertisements?: AdvertisementEntity[];

  @Column('uuid')
  brandId: BrandID;
  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;
}
