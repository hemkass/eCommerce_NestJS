import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Size } from '@prisma/client';
export class SizeDataDTO {
  @ApiProperty({ description: 'product size wanted (XS to XXL' })
  @IsEnum(Size)
  size: Size;
}
