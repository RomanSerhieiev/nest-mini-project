import { EEntity } from '../enums/entity.enum';
import { Opaque } from './opaque.type';

export type AdvertisementID = Opaque<string, EEntity.ADVERTISEMENTS>;
export type BrandID = Opaque<string, EEntity.BRANDS>;
export type DealershipID = Opaque<string, EEntity.DEALERSHIPS>;
export type DialogueID = Opaque<string, EEntity.DIALOGUES>;
export type MessageID = Opaque<string, EEntity.MESSAGES>;
export type ModelID = Opaque<string, EEntity.MODELS>;
export type RefreshTokenID = Opaque<string, EEntity.REFRESH_TOKENS>;
export type RequestToCreateBrandID = Opaque<string, EEntity.REQUESTS_TO_CREATE_BRAND>;
export type RequestToCreateModelID = Opaque<string, EEntity.REQUESTS_TO_CREATE_MODEL>;
export type ReviewID = Opaque<string, EEntity.REVIEWS>;
export type UserID = Opaque<string, EEntity.USERS>;
export type ViewID = Opaque<string, EEntity.VIEWS>;
