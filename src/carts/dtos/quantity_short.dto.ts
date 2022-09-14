import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QuantityShortDTO {
  cartId: string;

  @ApiProperty({
    description:
      'ProductId from intermediary table of the products in Cart, number expected because of auto-increment',
  })
  @IsNumber()
  isProductOnCartID: number;

  @ApiProperty({
    description:
      'productID that we want to know if the supply is adequate/sufficient',
  })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'quantity available by size' })
  @IsNumber()
  availableQuantity: number;

  @ApiProperty({
    description: 'difference between quantity asked for and quantity available',
  })
  @IsNumber()
  quantityShort: number;
}
