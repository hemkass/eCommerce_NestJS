import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { productDto } from 'src/products/dtos/product.dto';
import { ProductsService } from 'src/products/products.service';
import { UserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/users.service';

declare global {
  namespace Express {
    interface Request {
      existingProduct?: Product;
    }
  }
}

@Injectable()
export class ExistingProductMiddleware implements NestMiddleware {
  constructor(private productsService: ProductsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let productId;
    try {
      if (req.params.productId) {
        productId = req.params.productId;
      }
      if (req.body.productId) {
        productId = req.body.productId;
      }
      // let productId = req.params[0].split('/').pop();
      console.log('productId middleware', productId);
      if (productId) {
        const product = await this.productsService.isProduct(productId);

        if (product) {
          req.existingProduct = product;
        } else {
          throw new NotFoundException('no product found');
        }
      }
      next();
    } catch (error) {
      res.json(error);
    }
  }
}
