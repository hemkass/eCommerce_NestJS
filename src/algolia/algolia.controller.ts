import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { AlgoliaService } from './algolia.service';

@ApiTags('algolia')
@Controller('algolia')
export class AlgoliaController {
  constructor(private algoliaService: AlgoliaService) {}

  @Get() async indexingRecords() {
    console.log('all products', await this.algoliaService.indexingRecords());
    return await this.algoliaService.indexingRecords();
  }
}
