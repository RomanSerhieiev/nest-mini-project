import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserDto } from '../../../users/models/dto/base-user.dto';

export class BaseAuthDto extends PickType(BaseUserDto, [
  'email',
  'password',
  'image',
  'name',
  'role',
]) {
  @ApiProperty({
    description: 'Unique identifier for the device',
    example: 'device-12345',
  })
  @IsString()
  @IsNotEmpty()
  readonly deviceId: string;
}
