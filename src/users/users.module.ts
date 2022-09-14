import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbilityModule } from 'src/ability/ability.module';
import { CartsService } from 'src/carts/carts.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';

import { AuthService } from '../auth/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AbilityModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    CartsService,
    ProductsService,
    JwtService,
    StripeService,
    DeliveryService,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .exclude(
        { path: 'users/signup', method: RequestMethod.POST },
        { path: 'login', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}
