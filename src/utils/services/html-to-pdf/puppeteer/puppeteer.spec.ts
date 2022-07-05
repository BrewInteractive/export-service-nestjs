import {
  HtmlToPdf,
  HtmlToPdfType,
  PdfFormat,
} from '../../../../html-to-pdf/dto';
import { PuppeteerService } from './puppeteer';

describe('Puppeteer', () => {
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    puppeteerService = new PuppeteerService();
  });

  it('Should be defined', () => {
    expect(puppeteerService).toBeDefined();
  });

  it('The sent HTML must be converted to PDF', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      format: PdfFormat.A3,
    };
    expect(
      (await puppeteerService.generatePDFAsync(options)) instanceof Buffer,
    ).toEqual(true);
  });

  it('The sent Website Url must be converted to PDF', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
      format: PdfFormat.A5,
    };
    expect(
      (await puppeteerService.generatePDFAsync(options)) instanceof Buffer,
    ).toEqual(true);
  });
});
