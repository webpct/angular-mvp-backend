import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthRequest } from '../models/auth-request';
import { AuthService } from '../services/auth/auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from '@decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    private reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
      const request = context.switchToHttp().getRequest<AuthRequest>();
      const isPublic = this.reflector.get<boolean>(IS_PUBLIC, context.getHandler());

      if(isPublic) return true;

      request.currentUser = await this.authService.checkToken(request.cookies.accessToken || '');

      return true;
  }
}
