import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../../users/users.service';

import { UserDto } from '../../users/dtos/user.dto';
import { Carts } from '../../carts/dtos/UserCart.dto';
import { CartsService } from '../../carts/carts.service';
import { Cart } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      currentCart?: Cart;
    }
  }
}

@Injectable()
export class CurrentCartMiddleware implements NestMiddleware {
  constructor(private cartService: CartsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.session || {};

    if (cartId) {
      const cart = await this.cartService.isCart(cartId);
      if (cart) {
        req.currentCart = cart;
      }
    }
    next();
  }
}
