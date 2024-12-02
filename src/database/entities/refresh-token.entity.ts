import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/entity.model';
import { RefreshTokenID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.REFRESH_TOKENS)
export class RefreshTokenEntity extends IdCreated<RefreshTokenID> {
  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
