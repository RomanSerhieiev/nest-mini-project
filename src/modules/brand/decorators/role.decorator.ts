import { SetMetadata } from '@nestjs/common';

import { EUserRole } from '#modules/users/models/enums/user-role.enum';

export const Roles = (...roles: EUserRole[]) => SetMetadata('roles', roles);
