import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NODE_ENV_LOCAL } from './constant';
import dataSource from '../../data-source';

export const typeormConfig: TypeOrmModuleOptions = {
  ...dataSource.options,
  autoLoadEntities: true, // true인 경우, 엔티티들이 자동으로 불러와짐
  synchronize: process.env.NODE_ENV === NODE_ENV_LOCAL ? true : false, // 프로그램 시작할 때마다 DB스키마를 자동으로 재생성 하는지 여부
  logging: true, // 쿼리문과 에러가 로깅됨
};

