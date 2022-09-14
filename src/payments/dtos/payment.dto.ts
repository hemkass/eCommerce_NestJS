import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDTO {
  @ApiPropertyOptional()
  @IsOptional()
  create_at?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  owner?: object;

  @ApiPropertyOptional()
  @IsOptional()
  affiliateCart?: object;

  @ApiPropertyOptional()
  @IsString()
  sort?: string;

  total?: string;
}

export enum Sort {
  'asc',
  'desc',
}
