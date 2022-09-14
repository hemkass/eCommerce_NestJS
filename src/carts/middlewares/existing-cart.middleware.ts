import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Cart, Product } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { CartsService } from '../carts.service';

declare global {
  namespace Express {
    interface Request {
      existingCart?: Cart;
    }
  }
}

@Injectable()
export class ExistingCartMiddleware implements NestMiddleware {
  constructor(private cartsService: CartsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('datas', req.params.productId);
    try {
      let cartId;
      if (req.params.cartId) {
        cartId = req.params.cartId;
      }
      if (req.body.cartId) {
        cartId = req.body.cartId;
      }
      // let productId = req.params[0].split('/').pop();

      if (cartId) {
        console.log('cartId', cartId);
        const cart = await this.cartsService.isCart(cartId);

        if (cart) {
          console.log(cart);
          req.existingCart = cart;
        } else {
          throw new NotFoundException('no cart found');
        }
      }
      next();
    } catch (error) {
      res.json(error);
    }
  }
}
