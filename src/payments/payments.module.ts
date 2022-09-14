import { Module } from '@nestjs/common';
import { AbilityModule } from 'src/ability/ability.module';
import { CartsService } from 'src/carts/carts.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';
import { UsersService } from 'src/users/users.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [AbilityModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PrismaService,
    CartsService,
    ProductsService,
    UsersService,
    DeliveryService,
    StripeService,
  ],
})
export class PaymentsModule {}
