import { faker } from '@faker-js/faker';
import { StatusCart } from '@prisma/client';
import { getRandomIntInclusive } from '../../utils/utils';
import { randomWordInPrismaEnum } from './product-factory';

let errorMessage = () => {
  let errorArray: any = [];
  let random = getRandomIntInclusive(1, 5);
  for (let index = 0; index < 5; index++) {
    let newError = {
      error: `only ${random} (left) for product `,
    };
    errorArray.push(newError);
  }

  return errorArray;
};

export const CartFactory = () => {
  let status = randomWordInPrismaEnum(StatusCart);
  return {
    status: status,

    total: 0,

    error_Messages: errorMessage(),
  };
};
