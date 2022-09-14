import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewFactory } from '../../prisma/factories/review-factory';
import { PrismaService } from '../prisma/prisma.service';

import { newReview } from './customTypes/newreview.type';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async isProduct(id: string) {
    return await this.prisma.product.findUnique({ where: { id: id } });
  }

  async isReview(id: string) {
    return await this.prisma.review.findUnique({
      where: { id: id },
    });
  }

  async createReview(data) {
    let { createReviewData, product, userId } = data;
    let productId = product.id;
    let { title, description, rating_quality, rating_style, rating_size } =
      createReviewData;

    let rating_avg = (rating_quality + rating_style + rating_size) / 3;

    if (product) {
      let rating = await this.getratingByProduct(product.id);
      let data = {
        productId: product.id,
        rating_avg: rating,
      };

      await this.updateRatingOnProduct(data);

      const newReview: newReview = {
        title: title,
        description: description,
        rating_avg: parseFloat(rating_avg.toFixed(2)),
        rating_quality: Number(rating_quality),
        rating_style: Number(rating_style),
        rating_size: Number(rating_size),
        products: { connect: { id: productId } },
        owner: { connect: { id: userId } },
      };
      if (createReviewData.pictures) {
        newReview.pictures = {
          createMany: { data: createReviewData.pictures },
        };
      }

      const review = await this.prisma.review.create({
        data: newReview,
      });

      return review;
    }
  }

  async randomReview() {
    return ReviewFactory();
  }

  async getreviewsByProduct(product) {
    if (product) {
      const reviews = await this.prisma.review.findMany({
        where: { productId: product.id },
        include: { pictures: { select: { src: true } } },
      });
      if (!reviews) {
        throw new Error('Reviews not found');
      } else {
        return reviews;
      }
    }
  }

  async getratingByProduct(id: string) {
    const product = this.isProduct(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    } else {
      const reviews = await this.prisma.review.findMany({
        where: { productId: id },
        select: { rating_avg: true },
      });
      if (!reviews) {
        throw new NotFoundException('Reviews not found');
      } else {
        let total = 0.0;

        if (reviews.length === 0) {
          return 0;
        } else {
          reviews.map((rating) => {
            total = total + Number(rating.rating_avg);
          });

          let avg = total / reviews.length;
          return avg;
        }
      }
    }
  }

  async updateReview(id: string, updateData: UpdateReviewDto) {
    let data = {};
    data = { ...data, update_at: new Date() };

    const reviewToUpdate = this.isReview(id);

    if (!reviewToUpdate) {
      throw new Error('review not found');
    } else {
      if (updateData.title) {
        data = { ...data, title: updateData.title };
      }
      if (updateData.description) {
        data = { ...data, description: updateData.description };
      }
      if (updateData.useful) {
        data = { ...data, useful: updateData.useful };
      }
      if (updateData.rating_quality) {
        data = { ...data, rating_quality: updateData.rating_quality };
      }
      if (updateData.rating_style) {
        data = { ...data, rating_style: updateData.rating_style };
      }
      if (updateData.rating_size) {
        data = { ...data, rating_size: updateData.rating_size };
      }

      const reviewToUpdate = await this.prisma.review.update({
        where: {
          id: id,
        },
        data: data,
      });

      if (
        updateData.rating_size ||
        updateData.rating_style ||
        updateData.rating_quality
      ) {
        let rating_avg =
          (reviewToUpdate.rating_quality +
            reviewToUpdate.rating_style +
            reviewToUpdate.rating_size) /
          3;

        const newReview = await this.prisma.review.update({
          where: {
            id: id,
          },
          data: { rating_avg: rating_avg },
        });
        if (reviewToUpdate.productId) {
          let rating = await this.getratingByProduct(reviewToUpdate.productId);

          let data = {
            productId: reviewToUpdate.productId,
            rating_avg: rating,
          };

          await this.updateRatingOnProduct(data);

          return newReview;
        }
      } else {
        return reviewToUpdate;
      }
    }
  }

  async deleteReview(review) {
    if (review) {
      return this.prisma.review.delete({ where: { id: review.id } });
    }
  }

  async updateRatingOnProduct(data) {
    let { productId, rating_avg } = data;
    try {
      await this.prisma.product.update({
        where: { id: productId },
        data: { rating_avg: rating_avg },
      });
    } catch (error) {
      console.log('error update rating product', error);
    }
  }
}
