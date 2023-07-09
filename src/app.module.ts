import 'src/config/env';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// imports : 현재 모듈에서 다른 모듈을 가져옴
// TypeOrmModule.forRoot : TypeORM을 설정하고 데이터베이스 연결을 설정
// controllers : 현재 모듈에서 사용할 컨트롤러들을 정의
// providers : 의존성 주입(Dependency Injection)을 통해 필요한 객체를 제공하고 애플리케이션 전반에서 공유되는 서비스를 정의
/* 의존성 주입 순서
  1. 객체나 클래스에 대한 인터페이스를 정의
  2. 의존성을 주입하기 위해 객체 생성 및 주입을 수행하는 컨테이너를 사용, 컨테이너는 의존성을 관리하고 필요에 따라 객체를 생성하고 주입
  3. 의존성 사용: 주입된 객체를 사용하여 필요한 기능을 실행
*/
