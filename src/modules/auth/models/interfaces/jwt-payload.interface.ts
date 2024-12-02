import { UserID } from '#entities/types/id.type';

export interface IJwtPayload {
  userId: UserID;
  deviceId: string;
}
