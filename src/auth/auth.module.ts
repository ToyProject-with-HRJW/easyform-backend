import { Module } from '@nestjs/common';
import { AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from 'src/strategy/google.strategy'
import { NaverStrategy } from 'src/strategy/naver.strategy'
import { KakaoStrategy } from 'src/strategy/kakao.strategy'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRESIN } from 'src/config/constant';

const {AUTH_ACCESS_SECRET_KEY} = process.env;
@Module({
  imports: [TypeOrmModule.forFeature(
    [User] 
  ),
  JwtModule.register({
      secret: AUTH_ACCESS_SECRET_KEY, // JWT 토큰을 암호화/복호화하기 위한 비밀 키
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRESIN }, // Access Token의 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, NaverStrategy, KakaoStrategy],
})
export class AuthModule {}
// TypeOrmModule.forFeature : TypeORM을 사용하여 데이터베이스와 상호작용하는 모듈을 정의하는 데 사용되는 메서드