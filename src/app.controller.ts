import {
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiOAuth2,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cart } from '@prisma/client';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

import { Serialize } from '../interceptors/serialize.interceptors';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CartsService } from './carts/carts.service';
import { CurrentCart } from './carts/decorators/current-cart';
import { ExistingCart } from './carts/decorators/existing-cart';
import { Carts } from './carts/dtos/UserCart.dto';
import { UserDto } from './users/dtos/user.dto';

@Serialize(UserDto)
@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private cartService: CartsService
  ) {}

  @ApiBody({
    type: UserDto,
    description: 'classic auth with password +email',
    examples: {
      login: {
        value: {
          email: 'nestor@test.fr',
          password: 'azerty64',
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'classic login: user logged succefully returned',
  })
  @Post('login')
  async login(
    @Request() req,
    @Session() session: any,
    @CurrentCart() currentcart: Carts
  ): Promise<any> {
    let token = await this.authService.login(req.user);

    let user = req.user;
    console.log('depuis log', req.user, 'token', token);
    session.userId = req.user.id;
    user.token = token;

    if (currentcart) {
      let data = { user, cart: currentcart };

      let cart = await this.cartService.addOwnerCart(data);
      if (cart) {
        session.cartId = cart.id;
      }
    }

    return req.user;
  }

  @ApiOAuth2(['GoogleStrategy'])
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('/login/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Request() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    let google = await this.authService.loginGoogle(req);

    let jwtProcess = await this.authService.GoogleToJWT(google);

    return jwtProcess;
  }

  @Get('auth/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async FacebookAuthRedirect(@Request() req, @Session() session: any) {
    console.log('USER', req.user);
    let jwtProcess = await this.authService.GoogleToJWT(req.user);
    if (session.cartId) {
      console.log('cart owner,', session.cartId);
      let cart = await this.cartService.isCart(session.cartId);
      console.log('cart owner,', cart);
      let user = req.user;
      let data = { user, cart };
      let cartOwner = await this.cartService.addOwnerCart(data);
      if (cart) {
        session.cartId = cart.id;
      }
    }
    return jwtProcess;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  root(): string {
    return 'Hello World!';
  }
}
