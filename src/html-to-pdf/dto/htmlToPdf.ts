import { ApiPropertyOptional } from '@nestjs/swagger';
import { HtmlToPdfType } from './htmlToPdfType';
import { PdfFormat } from './pdfFormat';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsEnum,
  Matches,
} from 'class-validator';

export class HtmlToPdf {
  @ApiPropertyOptional({ default: 'file-name' })
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Matches('^[a-zA-Z0-9_-]*$')
  fileName!: string;

  @ApiPropertyOptional({ default: 'html' })
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsEnum(HtmlToPdfType)
  type!: HtmlToPdfType;

  @ApiPropertyOptional({ default: '<h1>Hello Word</h1>' })
  @ValidateIf((o) => o.type === HtmlToPdfType.HTML)
  @IsDefined()
  html?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.type === HtmlToPdfType.URL)
  @IsDefined()
  url?: string;

  @ApiPropertyOptional({ default: 'a4' })
  @IsString()
  @IsDefined()
  @IsEnum(PdfFormat)
  format?: PdfFormat;
}
