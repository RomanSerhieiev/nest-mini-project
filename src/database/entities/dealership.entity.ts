import { Column, Entity, OneToMany } from 'typeorm';

import { UserEntity } from '#entities/user.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { DealershipID } from './types/id.type';

@Entity(EEntity.DEALERSHIPS)
export class DealershipEntity extends IdCreatedUpdatedDeleted<DealershipID> {
  @Column('text')
  name: string;

  @OneToMany(() => UserEntity, (entity) => entity.dealership)
  users?: UserEntity[];
}
