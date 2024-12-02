import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { MessageEntity } from '#entities/message.entity';
import { UserEntity } from '#entities/user.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdatedDeleted } from './models/entity.model';
import { AdvertisementID, DialogueID, UserID } from './types/id.type';

@Entity(EEntity.DIALOGUES)
export class DialogueEntity extends IdCreatedUpdatedDeleted<DialogueID> {
  @OneToMany(() => MessageEntity, (entity) => entity.dialogue)
  messages?: MessageEntity[];

  @Column('uuid')
  buyerId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.outputDialogues)
  @JoinColumn({ name: 'buyerId' })
  buyer: UserEntity;

  @Column('uuid')
  sellerId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.inputDialogues)
  @JoinColumn({ name: 'sellerId' })
  seller: UserEntity;

  @Column('uuid')
  advertisementId: AdvertisementID;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.dialogues)
  @JoinColumn({ name: 'advertisementId' })
  advertisement: AdvertisementEntity;
}
