import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';

@Injectable()
export class MembershipsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const memberships = this.reflector.get<EUserMembership[]>('memberships', context.getHandler());
    if (!memberships) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.res.locals.user;

    if (!memberships.includes(user.membership)) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
