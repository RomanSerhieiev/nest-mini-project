import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ERequestStatus } from '#common/enums/request-status.enum';
import { BrandEntity } from '#entities/brand.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { BrandID, RequestToCreateBrandID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.REQUESTS_TO_CREATE_BRAND)
export class RequestToCreateBrandEntity extends IdCreatedUpdatedDeleted<RequestToCreateBrandID> {
  @Column('text')
  name: string;

  @Column('enum', { enum: ERequestStatus, default: ERequestStatus.PENDING })
  status: ERequestStatus;

  @Column('uuid', { nullable: true })
  brandId?: BrandID;
  @OneToOne(() => BrandEntity, (entity) => entity.requestToCreate)
  @JoinColumn({ name: 'brandId' })
  brand?: BrandEntity;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.brandRequests)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
