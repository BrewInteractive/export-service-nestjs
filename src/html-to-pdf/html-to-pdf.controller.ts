import { ApiKeyGuard } from '../utils/guards';
import { ApiSecurity } from '@nestjs/swagger';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HtmlToPdf } from './dto/html-to-pdf';
import { Response } from 'express';
import { Controller, UseGuards, Post, Body, Res } from '@nestjs/common';
import { ResponseType } from './dto';

@Controller('html-to-pdf')
@UseGuards(ApiKeyGuard)
@ApiSecurity('ApiKey')
export class HtmlToPdfController {
  constructor(private htmlToPdfService: HtmlToPdfService) {}

  @Post()
  async htmlToPdf(@Body() options: HtmlToPdf, @Res() response: Response) {
    const pdf = await this.htmlToPdfService.generatePDFAsync(options);
    if (options.responseType == ResponseType.BASE64) {
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ file: pdf }));
      response.end();
      return { file: pdf };
    } else {
      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${options.fileName}.pdf`,
        'Content-Length': pdf.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      });
      response.end(pdf);
      return pdf;
    }
  }
}
