import { faker } from '@faker-js/faker';
import { getRandomIntInclusive } from '../../utils/utils';
import { Brand, Categories, Morphology, Size, Style } from '@prisma/client';

let date = new Date();

export let randomWordInPrismaEnum = (dataArr): any => {
  //   console.log('mes datas', dataArr);
  var RoleArray = Object.keys(dataArr).map(function (Role) {
    return Role;
  });
  let randomNumber = getRandomIntInclusive(0, RoleArray.length);
  return RoleArray[randomNumber];
};

export let randomCategories = () => {
  let categoriesRandomArray: any = [];
  let categoriesArray = Object.keys(Categories).map(function (Categories) {
    return Categories;
  });

  let maxIndex = getRandomIntInclusive(1, categoriesArray.length);

  for (let index = 0; index <= maxIndex; index++) {
    let randomNumberOfCategories = getRandomIntInclusive(
      1,
      categoriesArray.length
    );

    if (
      categoriesRandomArray.indexOf(
        categoriesArray[randomNumberOfCategories]
      ) === -1
    ) {
      categoriesRandomArray.push(categoriesArray[randomNumberOfCategories]);
    }
  }

  return categoriesRandomArray;
};

export let randomPictures = () => {
  let maxIndex = getRandomIntInclusive(1, 10);
  let pictures: Object[] = [];
  let pictureObject;
  for (let index = 0; index <= maxIndex; index++) {
    pictureObject = {
      src: faker.image.fashion(1234, 2345, true),
      stylePicture: randomWordInPrismaEnum(Style).toString(),
      morphoPicture: randomWordInPrismaEnum(Morphology),
      sizePicture: randomWordInPrismaEnum(Size),
    };
    pictures.push(pictureObject);
  }

  return pictures;
};

function getRandomDate(maxDate) {
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}

export function ProductFactory() {
  let product = {
    favorite: Math.random() < 0.2,
    title: faker.commerce.product(),
    created_at: getRandomDate(Date.now()),

    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price(100, 200, 0)),
    ref: faker.vehicle.vin(),
    brand: randomWordInPrismaEnum(Brand),
    style: randomWordInPrismaEnum(Style),
    categories: randomCategories(),
    quantity_available: {
      create: {
        XXS: getRandomIntInclusive(0, 100),
        XS: getRandomIntInclusive(0, 100),
        S: getRandomIntInclusive(0, 100),
        M: getRandomIntInclusive(0, 100),
        L: getRandomIntInclusive(0, 100),
        XL: getRandomIntInclusive(0, 100),
        XXL: getRandomIntInclusive(0, 100),
        XXXL: getRandomIntInclusive(0, 100),
      },
    },
    // sustainable: { isActive: Math.random() < 0.5 },
    pictures: {
      createMany: { data: JSON.parse(JSON.stringify(randomPictures())) },
    },
  };
  //   console.log('from function', randomPictures());
  //   if (product.sustainable.isActive === true) {
  //     Object.assign(product.sustainable, {
  //       description: faker.commerce.productDescription(),
  //     });
  //   }

  return product;
}

// let multiplesProduct = () => {
//   let newProducts;

//   for (let i = 0; i < 4; i++) {
//     const newProduct = ProductFactory();
//     console.log('new Product', newProduct);

//     // await prisma.product.create({ data: newProduct });
//   }
// };
