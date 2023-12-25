import { HtmlToPdfModule } from './html-to-pdf.module';
import { Test } from '@nestjs/testing';

describe('HtmlToPdfModule', () => {
  let htmlToPdfModule: HtmlToPdfModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [HtmlToPdfModule],
    }).compile();

    htmlToPdfModule = app.get<HtmlToPdfModule>(HtmlToPdfModule);
  });

  it('Should be defined', () => {
    expect(htmlToPdfModule).toBeDefined();
  });
});
