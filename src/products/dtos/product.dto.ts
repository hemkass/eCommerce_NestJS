import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  isString,
  IsString,
  MaxLength,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { Size } from '@prisma/client';
import { PicturesTags, ProductSizes } from './create-product.dto';

export class Sustainable {
  isActive: boolean;

  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;
}

export class productDto {
  @IsString()
  id: string;
  @IsArray()
  categories: Array<string>;

  @IsString()
  ref: string;

  @IsString()
  @MaxLength(50, {
    message: 'Title is too long',
  })
  title: string;

  @IsString()
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;

  created_at: Date;
  update_at: Date;

  @IsString()
  brand: string;

  @IsArray()
  color: Array<string>;

  @IsOptional()
  style: string | null;

  @IsNumber()
  @IsBoolean()
  favorite: boolean;

  @IsNumber()
  rating_avg: number;

  @IsString()
  @IsOptional()
  DeliveryDate?: Date;

  @IsNumber()
  price: number;

  @IsArray()
  size: Array<string>;
}
