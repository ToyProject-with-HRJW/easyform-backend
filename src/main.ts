import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseFormatInterceptor } from './middleware/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('easyform api document')
    .setDescription('easyform api document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = 4000;
  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();

// 애플리케이션의 진입점(entry point)으로 사용되는 파일