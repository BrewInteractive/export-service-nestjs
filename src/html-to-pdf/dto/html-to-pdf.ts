import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { HtmlToPdfType } from './html-to-pdf-type';
import { PdfFormat } from './pdf-format';
import { ResponseType } from './response-type';

export class HtmlToPdf {
  @ApiPropertyOptional({ default: 'file-name' })
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Matches('^[a-zA-Z0-9_-]*$')
  fileName!: string;

  @ApiPropertyOptional({ default: 'Html' })
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

  @ApiPropertyOptional({ default: 'A4' })
  @IsString()
  @IsDefined()
  @IsEnum(PdfFormat)
  format?: PdfFormat;

  @ApiPropertyOptional({ default: 'Stream' })
  @IsString()
  @IsDefined()
  @IsEnum(ResponseType)
  responseType?: ResponseType;
}
