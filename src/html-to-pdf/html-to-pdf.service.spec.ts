import { HTML_TO_PDF_PROVIDE, PuppeteerService } from '../utils/services';
import { PdfFormat, ResponseType } from './dto';
import { Test, TestingModule } from '@nestjs/testing';

import { HtmlToPdf } from './dto/html-to-pdf';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HtmlToPdfType } from './dto/html-to-pdf-type';

describe('HtmlToPdfService', () => {
  let service: HtmlToPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HtmlToPdfService,
        {
          useClass: PuppeteerService,
          provide: HTML_TO_PDF_PROVIDE,
        },
      ],
    }).compile();

    service = module.get<HtmlToPdfService>(HtmlToPdfService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('The sent HTML must be converted to PDF. Response type STREAM.', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      format: PdfFormat.A4,
      responseType: ResponseType.STREAM,
    };
    expect((await service.generatePDFAsync(options)) instanceof Buffer).toEqual(
      true,
    );
  });

  it('The sent Website Url must be converted to PDF. Response type STREAM.', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
      format: PdfFormat.A5,
      responseType: ResponseType.STREAM,
    };
    expect((await service.generatePDFAsync(options)) instanceof Buffer).toEqual(
      true,
    );
  });

  it('The sent HTML must be converted to PDF. Response type BASE64.', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      responseType: ResponseType.BASE64,
    };
    const response = await service.generatePDFAsync(options);
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
      format: PdfFormat.A5,
      responseType: ResponseType.BASE64,
    };
    const response = await service.generatePDFAsync(options);
    expect(typeof response).toEqual('string');
    expect(response).not.toEqual(null);
    expect(response).not.toEqual(undefined);
    expect(response).not.toEqual('');
  });
});
