import { Request } from '@nestjs/common';
import { GoogleUserInfo } from './google-user-info';
import { User } from '@models/user.model';

export interface AuthRequest extends Request {
  user: GoogleUserInfo,
  currentUser: User,
  cookies: Record<string, string>,
  signedCookies: Record<string, string>,
}
