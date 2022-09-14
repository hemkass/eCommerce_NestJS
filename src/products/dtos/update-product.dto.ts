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
import { CreateProductDto } from './create-product.dto';

export class Sustainable {
  isActive: boolean;
  @MaxLength(300, {
    message: 'Description is too long',
  })
  description: string;
}

export class UpdateProductDto {
  @IsString()
  id: string;
  // toUpdate: Object;
  toUpdate: Partial<CreateProductDto>;
}
