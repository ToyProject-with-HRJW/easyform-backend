import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
