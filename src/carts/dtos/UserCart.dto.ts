import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Expose } from 'class-transformer';

export class UserCartDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ type: [String] })
  @Expose()
  carts: Carts[];
}

export interface Carts {
  id: string;
  created_at: Date;
  update_at?: Date | null;
  status: string;
  delivery_fees?: number;
  total: number;
  delivery_date?: Date;
  products?: Product;
}
