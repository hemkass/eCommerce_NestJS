import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum sort {
  asc,
  desc,
}
export class filtersProductsDTO {
  @ApiPropertyOptional({
    description:
      "filter by default, only asc or desc accepted, no '' needed, value by default desc ",
  })
  @IsOptional()
  sortDate: string;

  @ApiPropertyOptional({
    description: "only asc or desc accepted,no '' needed, value by default asc",
  })
  @IsEnum(sort)
  @IsOptional()
  priceSort: sort;

  @ApiPropertyOptional({
    description: "only asc or desc accepted,no '' needed,value by default desc",
  })
  @IsEnum(sort)
  @IsOptional()
  popularity: sort;

  @ApiPropertyOptional({
    description: 'Paginate:number of results to skip, by default 0',
  })
  @IsEnum(sort)
  @IsOptional()
  skip: number;

  @ApiPropertyOptional({
    description:
      'Paginate:number of results to take into account, by default 14',
  })
  @IsEnum(sort)
  @IsOptional()
  take: number;
}
