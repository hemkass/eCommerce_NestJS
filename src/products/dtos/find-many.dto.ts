import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class FindManyIdsDTO {
  @ApiProperty()
  @IsArray()
  ids: Array<string>;
}
