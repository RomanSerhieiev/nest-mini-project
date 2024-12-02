import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

import { TransformHelper } from '#common/helpers/transform.helper';
import { AdvertisementID, DialogueID, ReviewID } from '#entities/types/id.type';
import { ECurrency } from '#modules/advertisement/models/enums/currency.enum';
import { BrandResDto } from '#modules/brand/models/dto/res/brand.res.dto';
import { ModelResDto } from '#modules/model/models/dto/res/model.res.dto';
import { UserResDto } from '#modules/users/models/dto/res/user.res.dto';

export class BaseAdDto {
  @ApiProperty({
    description: 'Unique identifier for the advertisement',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly _id: AdvertisementID;

  @ApiProperty({
    description: 'Title of the advertisement',
    example: 'Daewoo Lanos 2006 in perfect condition',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(TransformHelper.trim)
  readonly title: string;

  @ApiProperty({
    description: 'Detailed description of the advertisement',
    example: 'This car has been well-maintained, with a mileage of 120,000 km...',
  })
  @IsString()
  @Length(0, 1000)
  @Transform(TransformHelper.trim)
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Price of the item being advertised',
    example: 4500.99,
  })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({
    description: 'Currency of the price',
    enum: ECurrency,
    example: ECurrency.USD,
  })
  @IsEnum(ECurrency)
  readonly currency: ECurrency;

  @ApiProperty({
    description: 'Year of manufacture',
    example: 2006,
  })
  @IsNumber()
  @Min(1886)
  readonly year: number;

  @ApiProperty({
    description: 'City where the item is located',
    example: 'Kyiv',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly city: string;

  @ApiProperty({
    description: 'Region where the item is located',
    example: 'Kyivska oblast',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly region: string;

  @ApiProperty({
    description: 'Number of failed attempts to advertise',
    example: 0,
  })
  @IsNumber()
  @Min(0)
  readonly failedAttempts: number;

  @ApiProperty({
    description: 'Availability status of the advertisement',
    example: true,
  })
  @IsBoolean()
  readonly isAvailable: boolean;

  @ApiProperty({
    description: 'Image URL for the advertisement',
    example: 'https://example.com/images/car.jpg',
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @ApiProperty({
    description: 'Views associated with the advertisement',
    isArray: true,
  })
  @IsOptional()
  readonly views?: number;

  @ApiProperty({
    description: 'Reviews associated with the advertisement',
    type: () => [String],
    isArray: true,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly reviews?: ReviewID[];

  @ApiProperty({
    description: 'Dialogues associated with the advertisement',
    type: () => [String],
    isArray: true,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly dialogues?: DialogueID[];

  @ApiProperty({
    description: 'User who created the advertisement',
    type: () => UserResDto,
  })
  @Type(() => UserResDto)
  readonly user: UserResDto;

  @ApiProperty({
    description: 'Brand associated with the advertisement',
    type: () => BrandResDto,
  })
  @Type(() => BrandResDto)
  readonly brand: BrandResDto;

  @ApiProperty({
    description: 'Model associated with the advertisement',
    type: () => ModelResDto,
  })
  @Type(() => ModelResDto)
  readonly model: ModelResDto;

  @ApiProperty({
    description: 'Date when the advertisement was created',
    example: '2023-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly created: Date;

  @ApiProperty({
    description: 'Date when the advertisement was last updated',
    example: '2023-01-02T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly updated: Date;

  @ApiProperty({
    description: 'Date when the advertisement was deleted',
    example: '2023-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly deleted?: Date;
}
