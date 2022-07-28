import { Request } from '@nestjs/common';
import { CookieSerializeOptions } from 'cookie';

export interface AuthResponse extends Request {
  cookie: (key: string, value: string, opt: CookieSerializeOptions) => string
}
