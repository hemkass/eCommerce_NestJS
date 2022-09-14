import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product, Review, User } from '@prisma/client';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';

import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewsService } from './reviews.service';
import { ExistingReview } from './decorators/existing-review';
import { ExistingProduct } from '../products/decorator/current-product.decorator';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @ApiBearerAuth()
  @ApiBody({
    type: CreateReviewDto,
    examples: {
      review: {
        value: {
          title: 'Couleur peu conforme',
          description: 'Couleur peu conforme aux photos, plutôt terne ',
          rating_quality: 3,
          rating_style: 2,
          rating_size: 1,
          pictures: [
            {
              src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
            },
            {
              src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/apparel-162192_1280_k0nq7t.png',
            },
          ],
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('/create/:productId')
  createReview(
    @Body() createReviewData: CreateReviewDto,
    @Param('productId') productId: string,
    @ExistingProduct() product: Product,
    @CurrentUser() user: User
  ) {
    let userId = user.id;
    let data = { createReviewData, product, userId };
    return this.reviewService.createReview(data);
  }

  @Get('/:productId')
  getreviewsByProduct(
    @Param('productId') id: string,
    @ExistingProduct() product: Product
  ) {
    return this.reviewService.getreviewsByProduct(product);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden, please log in ' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateReviewDto,
    description: 'Only send field to update, all field can be update except ID',
  })
  @Patch('/:reviewId')
  updateReview(
    @Param('reviewId') id: string,
    @Body() updateData: UpdateReviewDto
  ) {
    return this.reviewService.updateReview(id, updateData);
  }

  @Post('/randomReview')
  async randomReview() {
    return await this.reviewService.randomReview();
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden, please log in ' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:reviewId')
  async deleteReview(
    @Param('reviewId') reviewId: string,
    @ExistingReview() review: Review,
    @Res() response: Response
  ) {
    let reviewDeleted = await this.reviewService.deleteReview(review);

    if (reviewDeleted) {
      response.status(200).send({
        message: `Your review ${reviewId} been succesfully suppressed`,
      });
    } else {
      response.status(404).send({
        message: `Review ${reviewId} not found`,
      });
    }
  }
  @Get('/ratings/:productId')
  getratingByProduct(@Param('productId') id: string) {
    return this.reviewService.getratingByProduct(id);
  }
}
