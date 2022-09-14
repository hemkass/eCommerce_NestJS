import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { NotFoundError } from 'rxjs'
import { CartsService } from 'src/carts/carts.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'
import { newPaymentDTO } from './dtos/create_payment.dto'
import { PaymentsFilters } from './customTypes/all_payments'
import { PaymentDTO } from './dtos/payment.dto'
import { DeliveryService } from 'src/delivery/delivery.service'
import { StripeService } from 'src/stripe/stripe.service'

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartsService,
    private deliveryService: DeliveryService,
    private userService: UsersService,
    private stripe: StripeService
  ) {}

  async createPayment(datas) {
    let { paymentMethodId, cart } = datas
    // check if, quantity in cart are still availables
    await this.cartService.checkQuantityInCart(cart.id)

    //check if there is a free delivery
    const isAffiliatedDelivery = await this.deliveryService.isDelivery(cart.id)
    if (
      !isAffiliatedDelivery ||
      !isAffiliatedDelivery.affiliateUser?.stripeCustomerID
    ) {
      throw new ForbiddenException(
        'Need affiliated delivery, please create delivery First '
      )
    } else {
      // send payment to stripe
      let data = {
        paymentMethod: paymentMethodId,
        amount: isAffiliatedDelivery.total,
        customerId: isAffiliatedDelivery.affiliateUser.stripeCustomerID,
      }

      let stripe = await this.stripe.charge(data)
      // create payment in Bdd
      // if there is no bill adress, by default use delivery adress

      const newPayment = await this.prisma.payment.create({
        data: {
          owner: { connect: { id: isAffiliatedDelivery.affiliateUser.id } },
          affiliateCart: { connect: { id: cart.id } },
          affiliateDelivery: { connect: { id: isAffiliatedDelivery.id } },
        },
      })

      let cartStatus = await this.prisma.cart.update({
        where: { id: cart.id },
        data: { status: 'PAID' },
      })
    }
  }

  queryFilter(datas: Partial<PaymentDTO>) {
    let orderBy = {}
    orderBy = { created_at: `asc` }
    if (datas.sort) {
      if (datas.sort === 'desc') {
        orderBy = { created_at: `desc` }
      }
    }

    if (datas.total) {
      if (datas.sort === 'desc') {
        orderBy = { AffiliateCart: { total: 'desc' } }
      } else {
        orderBy = { AffiliateCart: { total: 'asc' } }
      }
    }

    return orderBy
  }

  async getAllPayments(datas: Partial<PaymentDTO>) {
    let filters = {}

    // sort by date or by total
    let orderBy = await this.queryFilter(datas)

    let payments = await this.prisma.payment.findMany({
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            lastname: true,
            adress_Bill: true,
            adress_Delivery: true,
          },
        },
        affiliateCart: { include: { products: true } },
      },
      orderBy: orderBy,
    })
    return payments
  }
  async isPayment(paymentId) {
    let payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        owner: { select: { id: true, email: true } },
        affiliateCart: { include: { products: true } },
      },
    })
    if (payment) {
      return payment
    } else {
      throw new NotFoundException(`No payment found for ${paymentId}`)
    }
  }

  async getPayments(user, filters) {
    let orderBy = await this.queryFilter(filters)

    let payment = await this.prisma.payment.findMany({
      where: { ownerId: user.id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            lastname: true,
            adress_Bill: true,
            adress_Delivery: true,
          },
        },
        affiliateCart: { include: { products: true } },
      },
      orderBy: orderBy,
    })
    return payment
  }

  // Route for admin only

  async getPaymentByUserEmail(datas) {
    let { email, filters } = datas

    let isUser = await this.userService.isUserByEmail(email)

    if (!isUser) {
      throw new NotFoundException(`No user found for ${email}`)
    } else {
      return await this.getPayments(isUser, filters)
    }
  }

  async getPaymentByUserID(datas) {
    let { id, filters } = datas

    let isUser = await this.userService.isUserById(id)

    if (!isUser) {
      throw new NotFoundException(`No user found for ${id}`)
    } else {
      return await this.getPayments(isUser, filters)
    }
  }
}
