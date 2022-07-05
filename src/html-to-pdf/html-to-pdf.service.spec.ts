import { Test, TestingModule } from '@nestjs/testing';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HtmlToPdf } from './dto/htmlToPdf';
import { HtmlToPdfType } from './dto/htmlToPdfType';
import { HTML_TO_PDF_PROVIDE, PuppeteerService } from '../utils/services';

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

  it('The sent HTML must be converted to PDF', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
    };
    expect((await service.generatePDFAsync(options)) instanceof Buffer).toEqual(
      true,
    );
  });

  it('The sent Website Url must be converted to PDF', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
    };
    expect((await service.generatePDFAsync(options)) instanceof Buffer).toEqual(
      true,
    );
  });
});
