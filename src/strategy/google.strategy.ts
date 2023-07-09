import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

const { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_SECRET_ID, AUTH_GOOGLE_CALLBACK_URL} = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: AUTH_GOOGLE_CLIENT_ID,
      clientSecret: AUTH_GOOGLE_SECRET_ID,
      callbackURL: AUTH_GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate (unusedParam1: string, unusedParam2: string, profile: any): Promise<any> {
    const { emails } = profile
    return emails[0].value
  }
}

// @nestjs/passport : NestJS 애플리케이션에서 인증(Authentication) 및 인가(Authorization)를 구현하기 위한 패키지
// @Injectable() : 클래스를 주입 가능한 서비스로 정의하는데 사용