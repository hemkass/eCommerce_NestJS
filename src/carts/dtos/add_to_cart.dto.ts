import { IsNumber, IsString } from 'class-validator';

export class AddToCartDTO {
  @IsNumber()
  delivery_fees: number;
}
