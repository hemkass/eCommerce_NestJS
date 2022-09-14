import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    // @ts-ignore
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  async createStripeCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(data) {
    let { paymentMethod, amount, customerId } = data;
    console.log('data', process.env.STRIPE_CURRENCY);
    let currency = process.env.STRIPE_CURRENCY;
    if (currency) {
      return this.stripe.paymentIntents.create({
        amount,
        customer: customerId,
        payment_method: paymentMethod,
        currency: currency,
        confirm: true,
      });
    } else throw new ForbiddenException('Need currency');
  }
}
