import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { User } from '@prisma/client';

import { FindManyIdsDTO } from 'src/products/dtos/find-many.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { DeliveryService } from './delivery.service';
import { DeliveryData } from './dtos/create_delivery.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: DeliveryData,
    examples: {
      CreateDelivery: {
        value: {
          delivery_type: 'CollectInStore',
          delivery_fees: 3.99,
          delivery_date: 'Saturday, September 17, 2016',
          free_delivery_amount: 30,
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create/:cartId')
  async createDelivery(
    @Body() deliveryData: DeliveryData,
    @Param('cartId') cartId: string,
    @CurrentUser() user: UserDto
  ) {
    const dataToSend = {
      deliveryData: deliveryData,
      cartId: cartId,
      user: user,
    };

    return this.deliveryService.createDelivery(dataToSend);
  }

  @Get('/amount/:cartId') checkDeliveryAmount(@Param('cartId') cartId: string) {
    return this.deliveryService.checkDeliveryAmount(cartId);
  }

  @Get('/:cartId') findDeliveryByCart(@Param('cartId') cartId: string) {
    return this.deliveryService.isDelivery(cartId);
  }

  @Patch('/:cartId') updateDelivery(
    @Param('cartId') cartId: string,
    @Body() toUpdate: Partial<DeliveryData>
  ) {
    let data = { filters: toUpdate, cartId: cartId };
    return this.deliveryService.updateDelivery(data);
  }

  @Delete('/:cartId') deleteDelivery(@Param('cartId') cartId: string) {
    return this.deliveryService.deleteDelivery(cartId);
  }

  @ApiBody({
    type: FindManyIdsDTO,
    description: 'Delete many product by once, with array of productIDs',
    examples: {
      CartIdsArray: {
        value: {
          ids: [
            '31c9ed5e-4849-4370-9843-de5251359fab',
            'ec384093-68b6-4bf9-87b4-09976fc1d5e4',
          ],
        },
      },
    },
  })
  @Post('deletemany')
  deleteManyProducts(@Body() ids: FindManyIdsDTO) {
    return this.deliveryService.deleteManyDeliveries(ids);
  }
}
