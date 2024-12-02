import { UserID } from '#entities/types/id.type';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

export interface IUserData {
  userId: UserID;
  deviceId: string;
  email: string;
  role: EUserRole;
  membership: EUserMembership;
}
