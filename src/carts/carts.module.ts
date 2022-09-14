import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AbilityModule } from '../ability/ability.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CurrentUserMiddleware } from '../users/middlewares/current-user.middleware';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CurrentCartMiddleware } from './middlewares/current-cart';
import { ExistingCartMiddleware } from './middlewares/existing-cart.middleware';

@Module({
  imports: [AbilityModule],
  controllers: [CartsController],
  providers: [CartsService, PrismaService, ProductsService],
})
export class CartsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentCartMiddleware).forRoutes('*');
    consumer
      .apply(ExistingCartMiddleware)
      .exclude(
        { path: 'carts', method: RequestMethod.POST },
        { path: 'carts/add/product/:productId', method: RequestMethod.PATCH }
      )
      .forRoutes(CartsController);
  }
}
