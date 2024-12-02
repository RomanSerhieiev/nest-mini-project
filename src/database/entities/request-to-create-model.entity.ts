import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ERequestStatus } from '#common/enums/request-status.enum';
import { BrandEntity } from '#entities/brand.entity';
import { ModelEntity } from '#entities/model.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { BrandID, ModelID, RequestToCreateModelID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.REQUESTS_TO_CREATE_MODEL)
export class RequestToCreateModelEntity extends IdCreatedUpdatedDeleted<RequestToCreateModelID> {
  @Column('text')
  name: string;

  @Column('uuid')
  brandId: BrandID;
  @ManyToOne(() => BrandEntity, (entity) => entity.requestsToCreateModel)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @Column('enum', { enum: ERequestStatus, default: ERequestStatus.PENDING })
  status: ERequestStatus;

  @Column('uuid', { nullable: true })
  modelId?: ModelID;
  @OneToOne(() => ModelEntity, (entity) => entity.requestToCreate)
  @JoinColumn({ name: 'modelId' })
  model?: ModelEntity;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.modelRequests)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
