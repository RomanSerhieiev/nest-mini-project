import { SetMetadata } from '@nestjs/common';

import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';

export const Memberships = (...memberships: EUserMembership[]) =>
  SetMetadata('memberships', memberships);
