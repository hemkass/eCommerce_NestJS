import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Delivery_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeliveryData {
  @ApiProperty()
  @IsEnum(Delivery_type)
  delivery_type: Delivery_type;

  @ApiProperty()
  @IsString()
  delivery_date: string;

  @ApiProperty()
  @IsNumber()
  delivery_fees: Decimal;

  @ApiPropertyOptional({
    description: 'If there is an amount from which delivery is free',
  })
  @IsOptional()
  free_delivery_amount?: Decimal;
}
