import { IHtmlToPdfService } from '../base/html-to-pdf';
import puppeteer from 'puppeteer';
import config from '../../../config';
import {
  HtmlToPdf,
  HtmlToPdfType,
  ResponseType,
} from '../../../../html-to-pdf/dto';

export class PuppeteerService implements IHtmlToPdfService {
  generatePDFAsync(options: HtmlToPdf): Promise<Buffer | string> {
    if (options.type == HtmlToPdfType.HTML) return this._htmlToPdf(options);
    else return this._webUrlToPdf(options);
  }

  private async _htmlToPdf(options: HtmlToPdf): Promise<Buffer | string> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: config().puppeteer.executablePath,
      args: ['--no-sandbox', '--headless'],
    });
    const page = await browser.newPage();
    await page.setContent(options.html);
    const buffer = await page.pdf({
      format: options.format,
      printBackground: true,
    });
    await browser.close();
    if (options.responseType == ResponseType.BASE64)
      return buffer.toString('base64');
    return buffer;
  }

  private async _webUrlToPdf(options: HtmlToPdf): Promise<Buffer | string> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: config().puppeteer.executablePath,
      args: ['--no-sandbox', '--headless'],
    });
    const page = await browser.newPage();
    await page.goto(options.url, {
      waitUntil: 'load',
    });
    const buffer = await page.pdf({
      format: options.format,
      printBackground: true,
    });
    await browser.close();
    if (options.responseType == ResponseType.BASE64)
      return buffer.toString('base64');
    return buffer;
  }
}
