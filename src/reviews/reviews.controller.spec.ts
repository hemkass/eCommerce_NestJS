import { Test, TestingModule } from '@nestjs/testing';
// import { describe, expect, it } from 'vitest';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
// npm run test:wt

describe('ReviewssController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;
  let prisma: PrismaService;
  let mockProductService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService, PrismaService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
