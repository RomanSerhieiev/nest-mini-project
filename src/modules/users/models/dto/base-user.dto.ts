import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

import { regexConstant } from '#common/constants/regex.constant';
import { TransformHelper } from '#common/helpers/transform.helper';
import {
  AdvertisementID,
  DealershipID,
  DialogueID,
  MessageID,
  RefreshTokenID,
  RequestToCreateBrandID,
  RequestToCreateModelID,
  ReviewID,
  UserID,
  ViewID,
} from '#entities/types/id.type';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

export class BaseUserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly _id: UserID;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  readonly name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Matches(regexConstant.EMAIL)
  readonly email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'QWErty123',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Matches(regexConstant.PASSWORD)
  readonly password: string;

  @ApiProperty({
    description: 'Optional profile image URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 3000)
  readonly image?: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'buyer',
    enum: EUserRole,
  })
  @IsEnum(EUserRole)
  readonly role: EUserRole;

  @ApiProperty({
    description: 'Membership type of the user',
    example: 'base',
    enum: EUserMembership,
    default: EUserMembership.BASE,
  })
  @IsEnum(EUserMembership)
  readonly membership: EUserMembership;

  readonly refreshTokens?: RefreshTokenID[];

  @ApiProperty({
    description: 'Advertisements created by the user',
    type: [String],
    required: false,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly advertisements?: AdvertisementID[];

  readonly views?: ViewID[];

  readonly reviews?: ReviewID[];

  readonly outputDialogues?: DialogueID[];

  readonly inputDialogues?: DialogueID[];

  readonly messages?: MessageID[];

  @ApiProperty({
    description: 'Requests to create new brands submitted by the user',
    type: [String],
    required: false,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly brandRequests?: RequestToCreateBrandID[];

  @ApiProperty({
    description: 'Requests to create new models submitted by the user',
    type: [String],
    required: false,
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly modelRequests?: RequestToCreateModelID[];

  @ApiProperty({
    description: 'Dealership ID, if the user belongs to a dealership',
    example: 'd9f1c2e6-e234-4f78-a5b3-c9c8198e45a1',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  @Type(() => String)
  readonly dealership?: DealershipID;

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
