import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
