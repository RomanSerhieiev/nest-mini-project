import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { TransformHelper } from '#common/helpers/transform.helper';
import { AdvertisementID, BrandID, ModelID } from '#entities/types/id.type';

export class BaseModelDto {
  @ApiProperty({
    description: 'Unique identifier for the model',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly _id: ModelID;

  @ApiProperty({
    description: 'Name of the model',
    example: 'Lanos',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  readonly name: string;

  @ApiProperty({
    description: 'ID of the brand to which this model belongs',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
    required: true,
  })
  @IsUUID()
  readonly brand: BrandID;

  @ApiProperty({
    description: 'List of advertisement identifiers associated with the model',
    example: ['a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e', 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e'],
    required: false,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly advertisements?: AdvertisementID[];

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly created: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2023-01-02T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly updated: Date;

  @ApiProperty({
    description: 'Date when the user was deleted',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly deleted: Date;
}
