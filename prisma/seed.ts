import { Cart, PrismaClient, Review } from '@prisma/client';
import { CreateInDB } from 'src/products/customTypes/create-product-Db';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { productDto } from 'src/products/dtos/product.dto';
import { CartDbData } from '../src/carts/custonType/CartDB';
import {
  productObjectData,
  productObjectExpected,
} from '../src/products/utils/TestsDatas/product-object';
import { newReview } from '../src/reviews/customTypes/newreview.type';
import { getRandomIntInclusive } from '../utils/utils';
import { CartFactory } from './factories/cart-factory';

import { ProductFactory } from './factories/product-factory';
import { ReviewFactory } from './factories/review-factory';
import { UserFactory } from './factories/users-factory';

const prisma = new PrismaClient();

async function main() {
  let num = 3;
  let numOfRecords = 10;

  // 1) Seed with users
  for (let i = 0; i < numOfRecords; i++) {
    const newUser = await UserFactory();
    await prisma.user.create({ data: newUser });
  }

  // 2)Seed with Products
  for (let i = 0; i < numOfRecords; i++) {
    let random = getRandomIntInclusive(0, num);
    const newProduct: CreateInDB = ProductFactory();
    // let owner = await prisma.user.findMany({ skip: random, take: 1 });
    // newProduct.owner = { connect: { id: owner[0].id } };

    let product = await prisma.product.create({
      data: newProduct,
      include: { reviews: true },
    });
    let ratingAVG = Number(
      (product.reviews[0].rating_quality +
        product.reviews[0].rating_size +
        product.reviews[0].rating_style) /
        3
    ).toFixed(2);
    await prisma.product.update({ data: { rating_avg: ratingAVG } });
  }

  // 3) Connect Product to Review and Seed Reviews

  for (let i = 0; i < numOfRecords; i++) {
    let random = getRandomIntInclusive(0, num);

    let product = await prisma.product.findMany({ skip: random, take: 1 });
    let owner = await prisma.user.findMany({ skip: random, take: 1 });
    let newReview: newReview = await ReviewFactory();
    newReview.products = { connect: { id: product[0].id } };
    newReview.owner = { connect: { id: owner[0].id } };

    await prisma.review.create({ data: newReview });
  }

  // 4) Connect Cart to Product and Seed Cart

  for (let i = 0; i < numOfRecords - 1; i++) {
    let random = getRandomIntInclusive(0, num);
    let newCart: CartDbData = await CartFactory();
    let randomNumberOfProducts = getRandomIntInclusive(0, 10);
    let products: any = [];
    for (let j = 0; j < randomNumberOfProducts; j++) {
      let product = await prisma.product.findMany({ skip: random, take: 1 });
      products.push({ productId: product[0].id });
    }

    let owner = await prisma.user.findMany({ skip: random, take: 1 });

    newCart.products = { createMany: { data: products } };
    newCart.owner = { connect: { id: owner[0].id } };

    await prisma.cart.create({ data: newCart });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
