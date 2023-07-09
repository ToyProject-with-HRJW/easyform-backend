import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV_LOCAL, NODE_ENV_PROD, NODE_ENV_LOCAL_PATH, NODE_ENV_PROD_PATH } from './constant';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === NODE_ENV_LOCAL ? NODE_ENV_LOCAL_PATH : NODE_ENV_PROD_PATH,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid(NODE_ENV_LOCAL, NODE_ENV_PROD).required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
  }),
});
