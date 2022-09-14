import { Delivery_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeliveryData {
  delivery_type: Delivery_type;
  delivery_Date: Date;
  delivery_fees: Decimal;
  free_delivery_amount?: Decimal;
}
