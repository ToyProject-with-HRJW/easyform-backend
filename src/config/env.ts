import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.local',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('local', 'prod').required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
  }),
});
