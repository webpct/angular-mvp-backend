import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../modules/auth/models/auth-request';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request.currentUser;
    return user.id;
  },
);
