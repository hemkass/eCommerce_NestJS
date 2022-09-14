import { ProductQuantity } from '@prisma/client';
import { ProductSizes } from '../dtos/create-product.dto';
import { quantity } from './create-product-Db';

export class UpdateOptions {
  formerQuantity: ProductQuantity;
}
