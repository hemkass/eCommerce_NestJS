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
  IsString,
  MaxLength,
} from 'class-validator';

import { Morphology, Size } from '@prisma/client';

export class Sustainable {
  isActive: boolean;
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;
}
export class CreateProductDto {
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

  @IsString()
  brand: string;

  @IsArray()
  color: Array<string>;

  @IsOptional()
  style?: string;

  @IsOptional()
  sustainable?: Sustainable;

  @IsOptional()
  @IsString()
  DeliveryDate?: string;

  @IsNumber()
  price: number;

  @IsArray()
  size: Array<string>;

  @IsNotEmpty()
  quantity_available: ProductSizes;

  @IsArray()
  pictures: Array<PicturesTags>;
}

export interface ProductSizes {
  XXS?: number;
  XS?: number;
  S?: number;
  M?: number;
  L?: number;
  XL?: number;
  XXL?: number;
  XXXL?: number;
}

export enum ProductMorphology {
  A = 'A',
  V = 'V',
  H = 'H',
  X = 'X',
  O = 'O',
}

export interface PicturesTags {
  src: string;
  stylePicture?: string;
  morphoPicture?: Morphology;
  genderPicture?: string;
  categoriesPicture?: string;
  colorPicture?: string;
  sizePicture?: Size;
}
