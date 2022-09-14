import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product, Size } from '@prisma/client';
export class addProductDTO {
  @ApiProperty({ description: 'product size wanted (XS to XXL' })
  @IsEnum(Size)
  size: Size;

  @ApiPropertyOptional({
    description: 'product quantity wanted, if empty, by default, it will be 1 ',
  })
  @IsNumber()
  @IsOptional()
  quantityWanted?: number;

  @ApiProperty({ description: 'productID to put in cart' })
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  cartId?: string;

  product: Product;
}
