import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../modules/auth/models/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.currentUser;
  },
);
