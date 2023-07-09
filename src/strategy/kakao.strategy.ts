import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

import { Injectable } from '@nestjs/common';

const { AUTH_KAKAO_CLIENT_ID, AUTH_KAKAO_SECRET_ID, AUTH_KAKAO_CALLBACK_URL } = process.env;

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: AUTH_KAKAO_CLIENT_ID,
      clientSecret: AUTH_KAKAO_SECRET_ID,
      callbackURL: AUTH_KAKAO_CALLBACK_URL,
      scope: ["account_email"],
    });
  }

  async validate (unusedParam1: string, unusedParam2: string, profile: any): Promise<any> {
    const { email } = profile._json.kakao_account
    return email
  }
}
