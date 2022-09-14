import { Module } from '@nestjs/common';
import { AbilityModule } from 'src/ability/ability.module';
import { CartsService } from 'src/carts/carts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';
import { UsersService } from 'src/users/users.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [AbilityModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    PrismaService,
    StripeService,
    CartsService,
    ProductsService,
    UsersService,
    ProductsService,
  ],
})
export class DeliveryModule {}
