import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @ApiPropertyOptional({ maxLength: 160 })
  @IsString()
  @IsOptional()
  @MaxLength(160, {
    message: 'Description is too long',
  })
  description: string;

  @ApiPropertyOptional({ description: 'only Int number between 0 and 5' })
  @IsOptional()
  @IsNumber()
  rating_quality: number;

  @ApiPropertyOptional({ description: 'only Int number between 0 and 5' })
  @IsOptional()
  @IsNumber()
  rating_style: number;

  @ApiPropertyOptional({ description: 'only Int number between 0 and 5' })
  @IsOptional()
  @IsNumber()
  rating_size: number;

  @ApiPropertyOptional({ description: 'only Int number between 0 and 5' })
  @IsOptional()
  @IsBoolean()
  useful: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  pictures: Array<string>;
}
