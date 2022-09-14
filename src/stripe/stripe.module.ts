import { Module } from '@nestjs/common'
import { CartsService } from 'src/carts/carts.service'
import { DeliveryModule } from 'src/delivery/delivery.module'
import { DeliveryService } from 'src/delivery/delivery.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'

@Module({
  controllers: [StripeController],
  providers: [
    StripeService,
    UsersService,
    PrismaService,
    CartsService,
    PrismaService,
    CartsService,
    ProductsService,
    DeliveryService,
  ],
})
export class StripeModule {}
