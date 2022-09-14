import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import path from 'path';
import { AbilityModule } from 'src/ability/ability.module';
import { CartsController } from 'src/carts/carts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExistingProductMiddleware } from './middlewares/existing-product.middleware';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [AbilityModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistingProductMiddleware)
      .exclude(
        { path: 'products/create', method: RequestMethod.POST },
        { path: 'products//allProductsByCategory', method: RequestMethod.POST }
      )
      .forRoutes(
        ProductsController,
        {
          path: 'products/:id',
          method: RequestMethod.DELETE,
        },
        {
          path: 'carts/add/product/:productId',
          method: RequestMethod.PATCH,
        },
        {
          path: 'carts/add/cart/:productId',
          method: RequestMethod.POST,
        },
        {
          path: 'reviews/create/:productId',
          method: RequestMethod.POST,
        },
        {
          path: 'reviews',
          method: RequestMethod.GET,
        }
      );
  }
}
