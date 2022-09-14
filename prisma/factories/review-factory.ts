import { faker } from '@faker-js/faker';
import { getRandomIntInclusive } from '../../utils/utils';

export let randomPictures = () => {
  let maxIndex = getRandomIntInclusive(1, 4);
  let pictures: Object[] = [];
  let pictureObject;
  for (let index = 0; index <= maxIndex; index++) {
    pictureObject = {
      src: faker.image.fashion(1234, 2345, true),
    };
    pictures.push(pictureObject);
  }

  return pictures;
};

export const ReviewFactory = async () => {
  return {
    useful: Math.random() < 0.5,
    title: faker.commerce.productName(),
    description: faker.lorem.lines(2),
    rating_quality: faker.datatype.number({ min: 0, max: 5 }),
    rating_style: faker.datatype.number({ min: 0, max: 5 }),
    rating_size: faker.datatype.number({ min: 0, max: 5 }),
    pictures: {
      createMany: { data: JSON.parse(JSON.stringify(randomPictures())) },
    },
  };
};
