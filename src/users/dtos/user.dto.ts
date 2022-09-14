import { IsOptional } from 'class-validator';
import { Adress } from './create-user.dto';
import { AdressDelivery, Morphology, Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  lastname: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  morphology?: Morphology | null;

  @ApiProperty()
  @Expose()
  @IsOptional()
  size?: string | null;

  @ApiProperty()
  @Expose()
  @IsOptional()
  weight?: string | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  admin?: boolean | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  role?: Role | null;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  adress_Delivery?: AdressDelivery;

  @Expose()
  @IsOptional()
  token?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  adress_Bill?: AdressDelivery;

  // @ApiPropertyOptional()
  // @IsOptional()
  // stripeCustomerID?: string
}
