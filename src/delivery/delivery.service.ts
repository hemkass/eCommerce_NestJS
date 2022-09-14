import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Delivery_type } from '@prisma/client';
import { CartsService } from 'src/carts/carts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindManyIdsDTO } from 'src/products/dtos/find-many.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DeliveryService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartsService,
    private stripeService: StripeService
  ) {}

  async createDelivery(data) {
    const { delivery_type, delivery_date } = data.deliveryData;
    let { delivery_fees } = data.deliveryData;

    const { user } = data;
    //check if there is a free delivery

    const isCart = await this.cartService.isCart(data.cartId);

    // check if, quantity in cart are still availables
    await this.cartService.checkQuantityInCart(data.cartId);

    const { free_delivery_amount } = data.deliveryData.free_delivery_amount;
    if (!isCart) {
      throw new NotFoundException('No cart found');
    } else {
      //check if user include delivery adress
      const isUserAdress = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: { adress_Delivery: { include: { User: true } } },
      });

      if (!isUserAdress?.adress_Delivery) {
        throw new UnauthorizedException('delivery adress not found');
      } else {
        const stripeCustomer = await this.stripeService.createStripeCustomer(
          user.lastname,
          user.email
        );
        console.log('stripe', stripeCustomer);

        await this.prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerID: stripeCustomer.id },
        });

        if (
          Number(isCart.total) >=
          Number(free_delivery_amount && delivery_type == 'CollectInStore')
        ) {
          delivery_fees = 0;
          return await this.prisma.delivery.create({
            data: {
              delivery_type: delivery_type,
              delivery_fees: Number(delivery_fees),
              delivery_date: new Date(delivery_date),
              free_delivery_amount: Number(free_delivery_amount),
              affiliateCart: { connect: { id: isCart.id } },
              affiliateUser: { connect: { id: user.id } },
              total: Number(isCart.total),
            },
          });
        }
        let total = Number(isCart.total) + Number(delivery_fees);
        return await this.prisma.delivery.create({
          data: {
            delivery_type: delivery_type,
            delivery_fees: Number(delivery_fees),
            delivery_date: new Date(delivery_date),
            affiliateCart: { connect: { id: isCart.id } },
            total: Number(total),
            affiliateUser: { connect: { id: user.id } },
          },
        });
      }
    }
  }

  async isDelivery(cartId) {
    console.log('cart delivery', cartId);
    const delivery = await this.prisma.delivery.findFirst({
      where: { cartId: cartId },
      include: {
        affiliateCart: { select: { id: true, total: true } },
        affiliateUser: {
          include: { adress_Delivery: true, adress_Bill: true },
        },
      },
    });
    console.log('delivery', delivery);
    return delivery;
  }

  async checkDeliveryAmount(cartId: string) {
    const isCart = await this.cartService.isCart(cartId);

    if (!isCart) {
      throw new NotFoundException('No cart found');
    } else {
      const isDelivery = await this.isDelivery(cartId);

      if (!isCart) {
        throw new NotFoundException(
          'No delivery found for this cart, create one first'
        );
      } else {
        if (isDelivery) {
          if (
            Number(isCart.total) >=
            Number(
              isDelivery?.free_delivery_amount &&
                isDelivery?.delivery_type === 'CollectInStore'
            )
          ) {
            let delivery_fees = 0;
            return await this.prisma.delivery.update({
              select: { delivery_fees: true, total: true },
              where: { id: isDelivery.id },
              data: { delivery_fees: 0, total: isCart.total },
            });
          } else {
            return {
              delivery_fees: isDelivery.delivery_fees,
              total: isDelivery.total,
            };
          }
        }
      }
    }
  }

  async updateDelivery(toUpdate) {
    const { filters, cartId } = toUpdate;

    const isDelivery = await this.isDelivery(cartId);
    if (!isDelivery) {
      throw new NotFoundException('No delivery Found');
    } else {
      let data = {};
      data = { ...data, update_at: new Date() };

      if (filters.delivery_fees) {
        data = { ...data, delivery_fees: Number(filters.delivery_fees) };
      }

      if (filters.delivery_type) {
        data = { ...data, delivery_type: filters.delivery_type };
        if (
          isDelivery.free_delivery_amount &&
          filters.delivery_type === 'CollectInStore' &&
          isDelivery.affiliateCart.total >= isDelivery.free_delivery_amount
        ) {
          data = { ...data, delivery_date: 0 };
        }
      }

      if (filters.free_delivery_amount) {
        data = {
          ...data,
          free_delivery_amount: filters.free_delivery_amount,
        };
        if (
          isDelivery.free_delivery_amount &&
          ((isDelivery.free_delivery_amount &&
            filters.delivery_type === 'CollectInStore' &&
            isDelivery.affiliateCart.total >=
              isDelivery.free_delivery_amount) ||
            (isDelivery.affiliateCart.total >=
              isDelivery.free_delivery_amount &&
              isDelivery.delivery_type === 'CollectInStore' &&
              !filters.delivery_type))
        ) {
          data = { ...data, delivery_date: 0 };
        }
      }

      if (filters.delivery_date) {
        data = { ...data, delivery_date: new Date(filters.delivery_date) };
      }

      return await this.prisma.product.update({
        where: {
          id: isDelivery.id,
        },
        data: data,
      });
    }
  }

  async deleteDelivery(cartId) {
    const deliveryToDelete = await this.isDelivery(cartId);
    if (!deliveryToDelete) {
      throw new NotFoundException(`delivery not found`);
    }
    return this.prisma.product.delete({ where: { id: deliveryToDelete.id } });
  }

  async findManysDeliveries(array: FindManyIdsDTO) {
    let arr = array.ids;
    const deliveries = await this.prisma.product.findMany({
      where: {
        id: { in: arr },
      },
    });

    return deliveries;
  }

  async deleteManyDeliveries(body) {
    const deliveriesToDelete = this.findManysDeliveries(body);
    if (!deliveriesToDelete) {
      throw new NotFoundException('One or more  product(s) not found');
    } else
      return this.prisma.product.deleteMany({
        where: { id: { in: body.ids } },
      });
  }
}
