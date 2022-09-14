import { Test, TestingModule } from '@nestjs/testing';
import { AlgoliaController } from './algolia.controller';

describe('AlgoliaController', () => {
  let controller: AlgoliaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlgoliaController],
    }).compile();

    controller = module.get<AlgoliaController>(AlgoliaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
