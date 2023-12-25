import { Inject, Injectable } from '@nestjs/common';
import { HtmlToPdf } from './dto/html-to-pdf';
import { HTML_TO_PDF_PROVIDE, IHtmlToPdfService } from '../utils/services';
import { PdfFormat } from './dto';

@Injectable()
export class HtmlToPdfService {
  constructor(
    @Inject(HTML_TO_PDF_PROVIDE)
    private readonly _htmlToPdfService: IHtmlToPdfService,
  ) {}

  public generatePDFAsync(options: HtmlToPdf) {
    if (!options.format) options.format = PdfFormat.A4;
    return this._htmlToPdfService.generatePDFAsync(options);
  }
}
