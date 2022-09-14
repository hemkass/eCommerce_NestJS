import { Test, TestingModule } from '@nestjs/testing';
import { AlgoliaService } from './algolia.service';

describe('AlgoliaService', () => {
  let service: AlgoliaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgoliaService],
    }).compile();

    service = module.get<AlgoliaService>(AlgoliaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
