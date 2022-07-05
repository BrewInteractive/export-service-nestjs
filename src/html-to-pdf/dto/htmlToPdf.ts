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
  IsEmpty,
} from 'class-validator';

export class HtmlToPdf {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Matches('^[a-zA-Z0-9_-]*$')
  fileName!: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @IsEnum(HtmlToPdfType)
  type!: HtmlToPdfType;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.type === HtmlToPdfType.HTML)
  @IsDefined()
  html?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.type === HtmlToPdfType.URL)
  @IsDefined()
  url?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsDefined()
  @IsEnum(PdfFormat)
  format?: PdfFormat;
}
