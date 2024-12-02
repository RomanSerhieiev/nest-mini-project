import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdCreated<T> {
  @PrimaryGeneratedColumn('uuid')
  _id: T;

  @CreateDateColumn()
  created: Date;
}

export abstract class IdCreatedUpdated<T> extends IdCreated<T> {
  @UpdateDateColumn()
  updated: Date;
}

export abstract class IdCreatedUpdatedDeleted<T> extends IdCreatedUpdated<T> {
  @DeleteDateColumn()
  deleted: Date;
}
