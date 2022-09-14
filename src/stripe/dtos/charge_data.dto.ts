import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { Carts } from 'src/carts/dtos/UserCart.dto'
import { UserDto } from 'src/users/dtos/user.dto'

export class DataChargeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethod: string

  user: UserDto

  currentCart: Carts
}

export default DataChargeDto
