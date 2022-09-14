import { Brand, Categories, Style } from '@prisma/client';
import {
  CreateProductDto,
  PicturesTags,
  ProductSizes,
} from '../dtos/create-product.dto';

export class CreateInDB {
  quantity_available?: any;
  pictures?: picturesCreate;
  sustainable?: sustainableCreate;

  categories: Categories;

  ref: string;

  title: string;

  description: string;

  created_at?: Date;

  brand?: Brand;

  color?: Array<string>;

  style: Style | null;

  favorite?: boolean;

  rating_avg?: string;

  DeliveryDate?: Date;

  price: number;

  size?: Array<string>;
  owner?: owner;
}

export interface quantity {
  create: ProductSizes;
}

export interface picturesCreate {
  createMany: any;
}

export interface PicturesDatas {
  data: Array<PicturesTags>;
}

export interface sustainableCreate {
  connect: sustainableId;
}

export interface sustainableId {
  id: number;
}

export interface owner {
  connect: any;
}
