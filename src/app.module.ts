import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HtmlToPdfModule } from './html-to-pdf/html-to-pdf.module';
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    HtmlToPdfModule,
  ],
})
export class AppModule {}
