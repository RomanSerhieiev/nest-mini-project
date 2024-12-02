import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { DealershipEntity } from '#entities/dealership.entity';
import { DialogueEntity } from '#entities/dialogue.entity';
import { MessageEntity } from '#entities/message.entity';
import { RequestToCreateBrandEntity } from '#entities/request-to-create-brand.entity';
import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';
import { ReviewEntity } from '#entities/review.entity';
import { ViewEntity } from '#entities/view.entity';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { DealershipID, UserID } from './types/id.type';

@Entity(EEntity.USERS)
export class UserEntity extends IdCreatedUpdatedDeleted<UserID> {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('enum', { enum: EUserRole })
  role: EUserRole;

  @Column('enum', { enum: EUserMembership, default: EUserMembership.BASE })
  membership: EUserMembership;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.user)
  advertisements?: AdvertisementEntity[];

  @OneToMany(() => ViewEntity, (entity) => entity.user)
  views?: ViewEntity[];

  @OneToMany(() => ReviewEntity, (entity) => entity.user)
  reviews?: ReviewEntity[];

  @OneToMany(() => DialogueEntity, (entity) => entity.buyer)
  outputDialogues?: DialogueEntity[];

  @OneToMany(() => DialogueEntity, (entity) => entity.seller)
  inputDialogues?: DialogueEntity[];

  @OneToMany(() => MessageEntity, (entity) => entity.user)
  messages?: MessageEntity[];

  @OneToMany(() => RequestToCreateBrandEntity, (entity) => entity.user)
  brandRequests?: RequestToCreateBrandEntity[];

  @OneToMany(() => RequestToCreateModelEntity, (entity) => entity.user)
  modelRequests?: RequestToCreateModelEntity[];

  @Column('uuid', { nullable: true })
  dealershipId?: DealershipID;
  @ManyToOne(() => DealershipEntity, (entity) => entity.users)
  @JoinColumn({ name: 'dealershipId' })
  dealership?: DealershipEntity;
}
