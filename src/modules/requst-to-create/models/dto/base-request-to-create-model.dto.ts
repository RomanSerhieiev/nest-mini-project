import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { ERequestStatus } from '#common/enums/request-status.enum';
import { TransformHelper } from '#common/helpers/transform.helper';
import { RequestToCreateModelID } from '#entities/types/id.type';
import { BrandResDto } from '#modules/brand/models/dto/res/brand.res.dto';
import { ModelResDto } from '#modules/model/models/dto/res/model.res.dto';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';

export class BaseRequestToCreateModelDto {
  @ApiProperty({
    description: 'Unique identifier for the request',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly _id: RequestToCreateModelID;

  @ApiProperty({
    description: 'Name of the model',
    example: 'Rio',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  readonly name: string;

  @ApiProperty({
    description: 'Brand',
    required: true,
  })
  readonly brand: BrandResDto;

  @ApiProperty({
    description: 'Status of the request',
    example: 'approved',
    enum: ERequestStatus,
    default: ERequestStatus.PENDING,
  })
  @IsEnum(ERequestStatus)
  readonly status: ERequestStatus;

  @ApiProperty({
    description: 'Model',
    required: false,
  })
  @IsOptional()
  readonly model?: ModelResDto;

  @ApiProperty({
    description: 'User',
    required: false,
  })
  @IsOptional()
  readonly user: UserResDto;

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
