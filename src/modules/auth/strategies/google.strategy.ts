import { OAuth2Strategy } from 'passport-google-oauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleUserInfo } from '../models/google-user-info';

const allowedEmailRegexp = new RegExp(/@leverx\.com$/g);

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor() {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${process.env.HOST}/auth/login`,
        scope: ['email', 'profile'],
      },
    );
  }

  async validate (accessToken: string, refreshToken: string, profile: any): Promise<GoogleUserInfo> {
    const { name, emails, photos } = profile
    const email = emails[0].value;

    if (!allowedEmailRegexp.test(email))
      throw new UnauthorizedException();

    return {
      email,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }
  }
}
