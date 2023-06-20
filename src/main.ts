import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './middleware/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  const port = 4000;
  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
