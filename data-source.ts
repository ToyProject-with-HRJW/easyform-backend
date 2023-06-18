import { DataSource } from 'typeorm';
import 'src/config/env';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/src/entity/*.entity.js"], // autoLoadEntities 옵션을 사용 안하면 entities: [] 옵션에 사용할 모든 엔티티를 넣어줘야함
  migrations: ["dist/src/migrations/*.js"],
});

export default dataSource;