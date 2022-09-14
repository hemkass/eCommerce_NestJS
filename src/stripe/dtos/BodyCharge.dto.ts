import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class BodyChargeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string
}

export default BodyChargeDto
