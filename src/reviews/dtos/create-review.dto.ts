import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @ApiProperty({ maxLength: 160 })
  @IsString()
  @MaxLength(160, {
    message: 'Description is too long',
  })
  description: string;

  @ApiProperty({ description: 'Numbers possibles: 0,1,2,3,4 and 5' })
  @IsNumber()
  rating_quality: number;

  @ApiProperty({ description: 'Numbers possibles: 0,1,2,3,4 and 5' })
  @ApiProperty()
  @IsNumber()
  rating_style: number;

  @ApiProperty({ description: 'Numbers possibles: 0,1,2,3,4 and 5' })
  @ApiProperty()
  @IsNumber()
  rating_size: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  pictures?: Array<string>;
}
