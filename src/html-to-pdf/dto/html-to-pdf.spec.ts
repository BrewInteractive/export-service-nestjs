import { HtmlToPdf } from './html-to-pdf';
import { HtmlToPdfType } from './html-to-pdf-type';
import { PdfFormat } from './pdf-format';
import { ResponseType } from './response-type';

describe('HtmlToPdf', () => {
  let htmlToPdf: HtmlToPdf;

  beforeEach(() => {
    htmlToPdf = new HtmlToPdf();
  });

  it('should be defined', () => {
    expect(htmlToPdf).toBeDefined();
  });

  it('should have a valid fileName', () => {
    htmlToPdf.fileName = 'valid_file_name';
    expect(htmlToPdf.fileName).toMatch(/^[a-zA-Z0-9_-]*$/);
  });

  it('should have a valid type', () => {
    htmlToPdf.type = HtmlToPdfType.HTML;
    expect(htmlToPdf.type).toEqual(HtmlToPdfType.HTML);
  });

  it('should have a valid html when type is HTML', () => {
    htmlToPdf.type = HtmlToPdfType.HTML;
    htmlToPdf.html = '<h1>Hello World</h1>';
    expect(htmlToPdf.html).toBeDefined();
  });

  it('should have a valid url when type is URL', () => {
    htmlToPdf.type = HtmlToPdfType.URL;
    htmlToPdf.url = 'http://example.com';
    expect(htmlToPdf.url).toBeDefined();
  });

  it('should have a valid format', () => {
    htmlToPdf.format = PdfFormat.A4;
    expect(htmlToPdf.format).toEqual(PdfFormat.A4);
  });

  it('should have a valid responseType', () => {
    htmlToPdf.responseType = ResponseType.STREAM;
    expect(htmlToPdf.responseType).toEqual(ResponseType.STREAM);
  });
});
