import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'liveness API', description: 'Check the server is alive' })
  liveness() : object {
    return {
      message: this.appService.liveness(),
    }
  }
}
