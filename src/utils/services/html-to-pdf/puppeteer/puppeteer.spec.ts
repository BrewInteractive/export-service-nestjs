import { PuppeteerService } from './puppeteer';
import {
  HtmlToPdf,
  HtmlToPdfType,
  PdfFormat,
  ResponseType,
} from '../../../../html-to-pdf/dto';

describe('Puppeteer', () => {
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    puppeteerService = new PuppeteerService();
  });

  it('Should be defined', () => {
    expect(puppeteerService).toBeDefined();
  });

  it('The sent HTML must be converted to PDF. Response type STREAM.', async () => {
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

  it('The sent Website Url must be converted to PDF. Response type STREAM.', async () => {
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

  it('The sent HTML must be converted to PDF. Response type BASE64.', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      responseType: ResponseType.BASE64,
    };
    const response = await puppeteerService.generatePDFAsync(options);
    expect(typeof response).toEqual('string');
    expect(response).not.toEqual(null);
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual('');
  });

  it('The sent Website Url must be converted to PDF. Response type BASE64.', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
      responseType: ResponseType.BASE64,
    };
    const response = await puppeteerService.generatePDFAsync(options);
    expect(typeof response).toEqual('string');
    expect(response).not.toEqual(null);
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual('');
  });
});
