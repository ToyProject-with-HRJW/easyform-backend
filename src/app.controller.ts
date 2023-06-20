import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from './interface/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  liveness() : ApiResponse<undefined> {
    return {
      message: this.appService.liveness(),
    }
  }
}
