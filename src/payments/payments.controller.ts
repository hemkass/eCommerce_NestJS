import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AdminGUard } from 'guards/admin.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { newPaymentDTO } from './dtos/create_payment.dto';
import { PaymentDTO } from './dtos/payment.dto';
import { PaymentsService } from './payments.service';

import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { UserDto } from 'src/users/dtos/user.dto';
import BodyChargeDto from 'src/stripe/dtos/BodyCharge.dto';
import { CurrentCart } from 'src/carts/decorators/current-cart';
import { Carts } from 'src/carts/dtos/UserCart.dto';
import { AbilitiesGuard } from 'guards/role.guard';
import { CheckAbilities } from 'src/ability/decorators/ability.decorator';
import { Action } from 'src/ability/ability.factory';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPayment(
    @Body() payment: BodyChargeDto,

    @CurrentCart() currentCart: Carts
  ) {
    let datas = { paymentMethodId: payment.paymentMethodId, cart: currentCart };
    return this.paymentService.createPayment(datas);
  }

  @Get()
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Manage, subject: 'User' })
  getAllPayments(@Query() datas: Partial<PaymentDTO>) {
    return this.paymentService.getAllPayments(datas);
  }

  @Get('/:paymentId')
  getPaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentService.isPayment(paymentId);
  }

  @Get('/user/:email')
  @UseGuards(AdminGUard)
  getPaymentByUserEmail(
    @Param('email') email: string,
    @Query() filters: Partial<PaymentDTO>
  ) {
    let datas = { email, filters };
    return this.paymentService.getPaymentByUserEmail(datas);
  }

  @Get('/user/:id')
  @UseGuards(AdminGUard)
  getPaymentByUserID(
    @Param('id') id: string,
    @Query() filters: Partial<PaymentDTO>
  ) {
    let datas = { id, filters };
    return this.paymentService.getPaymentByUserID(datas);
  }
}
