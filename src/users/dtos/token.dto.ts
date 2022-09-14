import { IsOptional } from 'class-validator';
import { Adress } from './create-user.dto';
import { Morphology } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  @Expose()
  token: string;
}
