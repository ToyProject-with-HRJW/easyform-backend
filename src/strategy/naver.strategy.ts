import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

import { Injectable } from '@nestjs/common';

const { AUTH_NAVER_CLIENT_ID, AUTH_NAVER_SECRET_ID, AUTH_NAVER_CALLBACK_URL } = process.env;

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: AUTH_NAVER_CLIENT_ID,
      clientSecret: AUTH_NAVER_SECRET_ID,
      callbackURL: AUTH_NAVER_CALLBACK_URL,
    });
  }

  async validate (unusedParam1: string, unusedParam2: string, profile: any): Promise<any> {
    const { email } = profile._json
    return email
  }
}
