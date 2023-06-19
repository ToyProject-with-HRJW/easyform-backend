import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  liveness(): string {
    return "OK!";
  }
}
