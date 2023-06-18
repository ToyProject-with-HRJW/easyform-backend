import { DataSource } from 'typeorm';
import 'src/config/env';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/src/entity/*.entity.js"],
  migrations: ["dist/src/database/migration/*.Migratio.js"],
});

export default dataSource;