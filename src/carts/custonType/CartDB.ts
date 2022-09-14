import { StatusCart } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export interface CartDbData {
  delivery_fees?: number;
  delivery_date?: Date;
  total: number;
  status: StatusCart;
  error_Messages?: object;
  owner?: ownerCart;
  products?: any;
}

export interface ownerCart {
  connect: object;
}
export interface CreateProductsCart {
  create: productsCart;
}
export interface productsCart {
  connect: object;
}
