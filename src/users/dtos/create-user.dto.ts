import { Morphology, Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiPropertyOptional({ description: 'optional until delivery module' })
  @IsOptional()
  @ApiPropertyOptional()
  adress_Delivery?: Adress;

  @ApiPropertyOptional()
  @IsOptional()
  adress_Bill?: Adress;

  @ApiPropertyOptional()
  @IsOptional()
  morphology: Morphology;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  size: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  weight: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  token?: object;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role?: object;
}

export interface Adress {
  number?: number;
  street?: string;
  postcode: number;
  city: string;
  country: string;
}
