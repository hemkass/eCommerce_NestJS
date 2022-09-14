import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExistingReviewMiddleware } from './middleware/existing-review.middleware';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistingReviewMiddleware)
      .exclude({ path: 'reviews', method: RequestMethod.POST })
      .forRoutes(ReviewsController);
  }
}
