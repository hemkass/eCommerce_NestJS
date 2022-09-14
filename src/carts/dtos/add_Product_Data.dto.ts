import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Size } from '@prisma/client';
export class addProductDataDTO {
  @ApiProperty({ description: 'product size wanted (XS to XXL' })
  @IsEnum(Size)
  size: Size;

  @ApiPropertyOptional({
    description:
      'if there is already a cart created, please give the cartId, if not a new cart will be created ',
  })
  @IsString()
  @IsOptional()
  cartId?: string;

  @ApiPropertyOptional({
    description: 'product quantity wanted, if empty, by default, it will be 1 ',
  })
  @IsNumber()
  @IsOptional()
  quantityWanted?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
