import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Cart, Product, Review } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ReviewsService } from '../reviews.service';

declare global {
  namespace Express {
    interface Request {
      existingReview?: Review;
    }
  }
}

@Injectable()
export class ExistingReviewMiddleware implements NestMiddleware {
  constructor(private reviewsService: ReviewsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('datas', req.params.productId);
    try {
      let reviewId;
      if (req.params.reviewId) {
        reviewId = req.params.reviewId;
      }
      if (req.body.cartId) {
        reviewId = req.body.reviewId;
      }
      // let productId = req.params[0].split('/').pop();

      if (reviewId) {
        const review = await this.reviewsService.isReview(reviewId);

        if (review) {
          req.existingReview = review;
        } else {
          throw new NotFoundException('no review found');
        }
      }
      next();
    } catch (error) {
      res.json(error);
    }
  }
}
