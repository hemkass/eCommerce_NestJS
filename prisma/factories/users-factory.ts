import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';

import { getRandomIntInclusive } from '../../utils/utils';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

export let randomRole = () => {
  var RoleArray = Object.keys(Role).map(function (Role) {
    return Role;
  });
  let randomNumber = getRandomIntInclusive(0, RoleArray.length);
  return RoleArray[randomNumber];
};

export const UserFactory = async () => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt('azerty64', salt, 32)) as Buffer;
  const result = salt + '.' + hash.toString('hex');

  return {
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    adress_Delivery: {
      create: {
        number: Number(faker.address.buildingNumber()),
        street: faker.address.street(),
        postcode: Number(faker.address.zipCode('#####')),
        city: faker.address.cityName(),
        country: 'France',
      },
    },

    password: result.toString(),
    admin: faker.datatype.boolean(),
    role: JSON.parse(JSON.stringify(randomRole())),
  };
};
