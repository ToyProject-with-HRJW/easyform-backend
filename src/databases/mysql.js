import Sequelize from "sequelize";
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: 'src/config/.env.local' })
} else if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: 'src/config/.env.prod' })
}

const  { 
    MYSQL_DATABASE, 
    MYSQL_USER, 
    MYSQL_PASSWORD,
    MYSQL_HOST, 
} = process.env;

const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  {
    dialect: 'mysql',   
    host: MYSQL_HOST,
    port: 3306
  }
);

await sequelize.authenticate();

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))

export { sequelize };