import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './utils/guards';
import { ApiSecurity } from '@nestjs/swagger';

@Controller()
@UseGuards(ApiKeyGuard)
@ApiSecurity('ApiKey')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
