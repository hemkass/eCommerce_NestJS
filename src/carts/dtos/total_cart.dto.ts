import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Total_cartDTO {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsString()
  cartId: string;
}
