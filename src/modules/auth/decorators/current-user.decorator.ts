import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUserData } from '../../users/models/interfaces/user-data.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserData => {
    const request = context.switchToHttp().getRequest();
    return request.res.locals.user;
  },
);
