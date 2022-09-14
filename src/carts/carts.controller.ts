import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Cart, Product, Size } from '@prisma/client';
import cookieSession from 'cookie-session';
import { query, Request, Response } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Serialize } from '../../interceptors/serialize.interceptors';
import { session } from 'passport';
import { ExistingProduct } from '../products/decorator/current-product.decorator';

import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserDto } from '../users/dtos/user.dto';
import { runInThisContext } from 'vm';
import { CartsService } from './carts.service';
import { CurrentCart } from './decorators/current-cart';
import { ExistingCart } from './decorators/existing-cart';
import { addProductDTO } from './dtos/addProduct.dto';
import { addProductDataDTO } from './dtos/add_Product_Data.dto';
import { CreateCartDTO } from './dtos/create_cart.dto';

import { Carts, UserCartDTO } from './dtos/UserCart.dto';
import { ExistingCartMiddleware } from './middlewares/existing-cart.middleware';
import { SizeDataDTO } from './dtos/size.dto';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}

  // @Post('/:productId/:cartId')
  // async isProductOnCart(
  //   @Param('productId') productId: string,
  //   @Param('cartId') cartId: string,
  // ) {
  //   return await this.cartService.isProductOnCart(productId, cartId,size);
  // }

  @Get('/:cartId')
  getCart(@Param('cartId') cartId: string, @ExistingCart() cart) {
    return this.cartService.getCart(cart);
  }

  @ApiBody({
    type: CreateCartDTO,
    description: 'add first product on cart, creating the cart',
    examples: {
      firstproduct: {
        value: {
          size: 'M',
          quantity: 3,
        },
      },
    },
  })
  @Post('add/cart/:productId')
  async newCart(
    @Param('productId') productId: string,
    @ExistingProduct() product,
    @Session() session: any,
    @Req() req
  ) {
    let cart = await this.cartService.newCart(productId);

    if (cart) {
      req.session.cartId = cart.id;
      session.cartId = cart.id;

      return cart;
    } else {
      throw new NotFoundException('no cart found');
    }
  }

  @ApiBody({
    type: addProductDataDTO,
    examples: {
      products: {
        value: {
          size: 'M',
          quantity: 20,
          cartId: '15e4d1c0-2856-4da7-b9e9-cd4df194548c',
        },
      },
    },
  })
  @Patch('/add/product/:productId')
  addToCart(
    @Param('productId') productId: string,
    @ExistingProduct() product,
    // @Param('cartId') cartId: string,
    @Body() body: addProductDataDTO
  ) {
    let size = body.size;
    let quantity = Number(body.quantity);

    let addProductData: addProductDTO = {
      productId: productId,
      size: size,
      quantityWanted: quantity,
      product: product,
    };
    if (body.cartId) {
      addProductData.cartId = body.cartId;
    }
    return this.cartService.addProductToCart(addProductData);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden, please log in ' })
  @UseGuards(JwtAuthGuard)
  @Patch('/add/owner/:cartId')
  async addOwner(
    @CurrentUser() user: UserDto,
    @Param('cartId') cartId: string,
    @ExistingCart() cart: Cart,
    @Req() req,

    @Session()
    session: any
  ) {
    let data = { user, cart };
    console.log('controller', user);
    console.log('controller', cart);
    // const cartOwner = await this.cartService.addOwnerCart(data);
    if (cart) {
      session.cartId = cart.id;
    } else {
      throw new NotFoundException('no cart found');
    }
    // return cartOwner;
  }

  @Patch('/error_message/delete/:cartId')
  async deleteMessage(
    @Param('cartId') cartId: string,
    @ExistingCart() cart: Cart,
    @Res() response: Response
  ): Promise<any> {
    const deletedMessage = await this.cartService.deleteErrorMessage(cart);
    if (deletedMessage) {
      response.status(200).send({
        message: ` error(s) message(s) deleted`,
      });
    } else {
      response.status(404).send({
        message: `Cart ${cartId} not found`,
      });
    }
  }

  @ApiBody({ type: addProductDTO })
  @Patch('remove/product/:productId/:cartId')
  async removeFromCart(
    @Param('productId') productId: string,
    @Param('cartId') cartId: string,
    @Body() body: addProductDTO,
    @Res() response: Response
  ): Promise<any> {
    let quantityIncartDATA: Partial<addProductDTO> = {
      productId: body.productId,
      cartId: body.cartId,
      size: body.size,
    };
    let deletedFromCart = await this.cartService.removeFromCart(
      quantityIncartDATA
    );
    if (deletedFromCart) {
      response.status(200).send({
        message: `Your product ${productId} has been succesfully suppress from cart ${cartId} `,
      });
    } else {
      response.status(404).send({
        message: `product ${productId} not found on the cart ${cartId} `,
      });
    }
  }

  @Delete('/:cartId')
  async deleteWholeCart(
    @Param('cartId') cartId: string,
    @ExistingCart() cart: Cart,
    @Res() response: Response,
    @Session() session: any
  ): Promise<any> {
    const cartDeleted = await this.cartService.deleteWholeCart(cart);
    // if (session.cartId === cartId) {
    //   session.cartId = null;
    // }
    if (cartDeleted) {
      response.status(200).send({
        message: `Your cart ${cartId} been succesfully suppress`,
      });
    } else {
      response.status(404).send({
        message: `Cart ${cartId} not found`,
      });
    }
  }

  //   @Post('/productOnCart/:productId/:cartId') async isProductOnCartAllSize(
  //     @Param('cartId') cartId: string,
  //     @Param('productId') productId?: string
  //   ) {
  //     let quantityIncartDATA = { productId, cartId };
  //     return await this.cartService.isProductOnCartAllSize(quantityIncartDATA);
  //   }

  @ApiBody({ type: SizeDataDTO })
  @Post('/productOnCart/:productId/:cartId')
  async isProductOnCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body() body: SizeDataDTO
  ) {
    let size = body.size;
    let quantityIncartDATA = { productId, cartId, size };
    return await this.cartService.isProductOnCart(quantityIncartDATA);
  }

  @Serialize(UserCartDTO)
  @Post('/former')
  async findOlderCart(@Param('userId') userId: string) {
    return await this.cartService.findOlderCart(userId);
  }
}
