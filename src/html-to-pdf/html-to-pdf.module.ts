import { Module } from '@nestjs/common';
import { HtmlToPdfController } from './html-to-pdf.controller';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HTML_TO_PDF_PROVIDE, PuppeteerService } from '../utils/services';

@Module({
  controllers: [HtmlToPdfController],
  providers: [
    HtmlToPdfService,
    {
      useClass: PuppeteerService,
      provide: HTML_TO_PDF_PROVIDE,
    },
  ],
})
export class HtmlToPdfModule {}
