import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DialogueEntity } from '#entities/dialogue.entity';
import { UserEntity } from '#entities/user.entity';

import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/entity.model';
import { DialogueID, MessageID, UserID } from './types/id.type';

@Entity(EEntity.MESSAGES)
export class MessageEntity extends IdCreated<MessageID> {
  @Column('text')
  body: string;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.messages)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  dialogueId: DialogueID;
  @ManyToOne(() => DialogueEntity, (entity) => entity.messages)
  @JoinColumn({ name: 'dialogueId' })
  dialogue: DialogueEntity;
}
