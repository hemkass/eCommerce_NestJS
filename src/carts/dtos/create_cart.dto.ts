import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDTO {
  @ApiProperty({
    description:
      'product size wanted (XS to XXL), you are creating new cart, by adding the first product',
  })
  @IsString()
  size: string;

  @ApiPropertyOptional({
    description: 'product quantity wanted, if empty, by default, it will be 1 ',
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional({ description: 'productID to put in cart' })
  @IsString()
  @IsOptional()
  productId: string;
}
