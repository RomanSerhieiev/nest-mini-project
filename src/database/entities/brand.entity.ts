import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { ModelEntity } from '#entities/model.entity';
import { RequestToCreateBrandEntity } from '#entities/request-to-create-brand.entity';
import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { BrandID } from './types/id.type';

@Entity(EEntity.BRANDS)
export class BrandEntity extends IdCreatedUpdatedDeleted<BrandID> {
  @Column('text', { unique: true })
  name: string;

  @OneToOne(() => RequestToCreateBrandEntity, (entity) => entity.brand)
  requestToCreate: RequestToCreateBrandEntity;

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity[];

  @OneToMany(() => RequestToCreateModelEntity, (entity) => entity.brand)
  requestsToCreateModel?: RequestToCreateModelEntity[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.brand)
  advertisements?: AdvertisementEntity[];
}
