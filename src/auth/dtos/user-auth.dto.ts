import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class userAuthDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  size: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  token: object;

  @ApiPropertyOptional()
  @IsOptional()
  admin?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sub: string;
}
