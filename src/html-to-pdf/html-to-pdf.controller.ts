import { ApiKeyGuard } from '../utils/guards';
import { ApiSecurity } from '@nestjs/swagger';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HtmlToPdf } from './dto/htmlToPdf';
import { Response } from 'express';
import { Controller, UseGuards, Post, Body, Res } from '@nestjs/common';

@Controller('html-to-pdf')
@UseGuards(ApiKeyGuard)
@ApiSecurity('ApiKey')
export class HtmlToPdfController {
  constructor(private htmlToPdfService: HtmlToPdfService) {}

  @Post()
  async htmlToPdf(@Body() options: HtmlToPdf, @Res() response: Response) {
    const pdf = await this.htmlToPdfService.generatePDFAsync(options);
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${options.fileName}.pdf`,
      'Content-Length': pdf.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    response.end(pdf);
  }
}
