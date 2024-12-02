import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DialogueEntity } from '#entities/dialogue.entity';

@Injectable()
export class DialogueRepository extends Repository<DialogueEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DialogueEntity, dataSource.manager);
  }
}
