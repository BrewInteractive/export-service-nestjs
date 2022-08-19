import { Test, TestingModule } from '@nestjs/testing';
import { HtmlToPdfController } from './html-to-pdf.controller';
import { HtmlToPdfService } from './html-to-pdf.service';
import { HTML_TO_PDF_PROVIDE, PuppeteerService } from '../utils/services';
import { HtmlToPdf, HtmlToPdfType, PdfFormat, ResponseType } from './dto';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';

describe('HtmlToPdfController', () => {
  let controller: HtmlToPdfController;
  let service: HtmlToPdfService;

  const mockResponseObject = () => {
    return createMock<Response>({
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HtmlToPdfController],
      providers: [
        HtmlToPdfService,
        {
          useClass: PuppeteerService,
          provide: HTML_TO_PDF_PROVIDE,
        },
      ],
    }).compile();

    controller = module.get<HtmlToPdfController>(HtmlToPdfController);
    service = module.get<HtmlToPdfService>(HtmlToPdfService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('The sent HTML must be converted to PDF. Response type STREAM.', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      format: PdfFormat.A5,
      responseType: ResponseType.STREAM,
    };
    expect(
      (await controller.htmlToPdf(options, mockResponseObject())) instanceof
        Buffer,
    ).toEqual(true);
  });

  it('The sent Website Url must be converted to PDF. Response type STREAM.', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
      format: PdfFormat.A4,
      responseType: ResponseType.STREAM,
    };
    expect(
      (await controller.htmlToPdf(options, mockResponseObject())) instanceof
        Buffer,
    ).toEqual(true);
  });

  it('The sent HTML must be converted to PDF. Response type BASE64.', async () => {
    const options: HtmlToPdf = {
      html: '<h1>Hello Word</h1>',
      type: HtmlToPdfType.HTML,
      fileName: 'hello-word',
      format: PdfFormat.A5,
      responseType: ResponseType.BASE64,
    };
    const response = await controller.htmlToPdf(options, mockResponseObject());
    expect(response).toHaveProperty('file');
  });

  it('The sent Website Url must be converted to PDF. Response type BASE64.', async () => {
    const options: HtmlToPdf = {
      url: 'https://google.com.tr',
      type: HtmlToPdfType.URL,
      fileName: 'hello-word',
      format: PdfFormat.A4,
      responseType: ResponseType.BASE64,
    };
    const response = await controller.htmlToPdf(options, mockResponseObject());
    expect(response).toHaveProperty('file');
  });
});
