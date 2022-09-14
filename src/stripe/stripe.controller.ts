import {
  Body,
  Controller,
  ForbiddenException,
  GoneException,
  Post,
  Req,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger'
import { CurrentUser } from 'decorators/profile-user.decorator'
import { JwtAuthGuard } from 'guards/jwt-auth.guard'
import { CartsService } from 'src/carts/carts.service'
import { CurrentCart } from 'src/carts/decorators/current-cart'
import { CreateCartDTO } from 'src/carts/dtos/create_cart.dto'
import { Carts } from 'src/carts/dtos/UserCart.dto'
import { DeliveryService } from 'src/delivery/delivery.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from 'src/users/dtos/user.dto'
import { UsersService } from 'src/users/users.service'
import CreateChargeDto, { BodyChargeDto } from './dtos/BodyCharge.dto'
import DataChargeDto from './dtos/charge_data.dto'
import { StripeService } from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private userService: UsersService,
    private prisma: PrismaService,
    private deliveryService: DeliveryService,
    private cartService: CartsService
  ) {}

  //   @Post()
  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   async createCharge(
  //     @Body() charge: BodyChargeDto,
  //     @Request() req,

  //     @CurrentCart() currentCart: Carts
  //   ) {
  //     // check if, quantity in cart are still availables
  //     await this.cartService.checkQuantityInCart(currentCart.id)

  //     //check if there is a free delivery
  //     const isAffiliatedDelivery = await this.deliveryService.isDelivery(
  //       currentCart.id
  //     )
  //     if (
  //       !isAffiliatedDelivery ||
  //       !isAffiliatedDelivery.affiliateUser?.stripeCustomerID
  //     ) {
  //       throw new ForbiddenException(
  //         'Need affiliated delivery, please create delivery First '
  //       )
  //     } else {
  //       let data = {
  //         paymentMethod: charge.paymentMethodId,
  //         amount: isAffiliatedDelivery.total,
  //         customerId: isAffiliatedDelivery.affiliateUser.stripeCustomerID,
  //       }

  //       return await this.stripeService.charge(data)
  //     }
  //}
}
