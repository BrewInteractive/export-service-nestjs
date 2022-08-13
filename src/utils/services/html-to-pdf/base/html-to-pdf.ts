import { HtmlToPdf } from '../../../../html-to-pdf/dto';

export const HTML_TO_PDF_PROVIDE = 'HTML_TO_PDF';

export interface IHtmlToPdfService {
  generatePDFAsync(options: HtmlToPdf): Promise<Buffer | string>;
}
