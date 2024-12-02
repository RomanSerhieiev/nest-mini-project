import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}

  public async health(): Promise<string> {
    return 'health';
  }
}
