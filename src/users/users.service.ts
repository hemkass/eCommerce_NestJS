import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createUser } from './customTypes/user.type';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { randomRole } from '../../prisma/factories/users-factory';
import { getRandomIntInclusive } from 'utils/utils';
import { Role } from '@prisma/client';
import {
  ProductFactory,
  randomCategories,
} from '../../prisma/factories/product-factory';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async isUserById(id: string) {
    if (!id) {
      return null;
    } else {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    }
  }

  async isUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateRole(toUpdate) {
    const { user, role } = toUpdate;
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { role: role.role },
    });
  }

  async createUser(createUserData) {
    const { email, password, adress_Delivery, lastname, firstname, token } =
      createUserData;
    const myUser = await this.isUserByEmail(email);

    if (!myUser) {
      let userData: createUser = {
        email: email,
        password: password,

        lastname: lastname,
        firstname: firstname,
        token: createUserData.token,
      };

      if (createUserData.adress_Delivery) {
        userData = {
          ...userData,
          adress_Delivery: { create: adress_Delivery },
        };
      }

      if (createUserData.morphology) {
        userData = { ...userData, morphology: createUserData.morphology };
      }

      if (createUserData.size) {
        userData = { ...userData, size: createUserData.size };
      }
      if (createUserData.weight) {
        userData = { ...userData, weight: createUserData.weight };
      }

      if (createUserData.role) {
        userData = { ...userData, role: createUserData.role };
      }

      if (createUserData.adress_Bill) {
        createUserData.adress_Bill.number = Number(
          createUserData.adress_Bill.number
        );
        createUserData.adress_Bill.postcode = Number(
          createUserData.adress_Bill.postcode
        );
        userData = {
          ...userData,
          adress_Bill: { create: createUserData.adress_Bill },
        };
      }
      const user = await this.prisma.user.create({ data: userData });
      return user;
    } else {
      return null;
    }
  }

  async randomUser() {
    const newRole = ProductFactory();

    return newRole;
  }

  randomProduct() {
    let product = ProductFactory();
    return product;
  }

  async updateUser(user, toUpdate) {
    let data = {};

    if (toUpdate.email) {
      data = { ...data, email: toUpdate.email };
    }
    if (toUpdate.size) {
      data = { ...data, size: toUpdate.size };
    }
    if (toUpdate.morphology) {
      data = { ...data, morphology: toUpdate.morphology };
    }

    if (toUpdate.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(toUpdate.password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');
      toUpdate.password = result;
      data = { ...data, password: result };
    }

    if (toUpdate.weight) {
      data = { ...data, email: toUpdate.email };
    }
    if (toUpdate.adress_Bill) {
      toUpdate.adress_Bill.number = Number(toUpdate.adress_Bill.number);
      toUpdate.adress_Bill.postcode = Number(toUpdate.adress_Bill.postcode);
      data = {
        ...data,
        adress_Bill: { update: toUpdate.adress_Bill },
      };
    }
    if (toUpdate.adress_Delivery) {
      toUpdate.adress_Bill.number = Number(toUpdate.adress_Bill.number);
      toUpdate.adress_Bill.postcode = Number(toUpdate.adress_Bill.postcode);
      data = {
        ...data,
        adress_Bill: { update: toUpdate.adress_Bill },
      };
    }
    const userUpdated = await this.prisma.user.update({
      data: data,
      where: { id: user.id },
    });
    return userUpdated;
  }

  async DeleteUser(user) {
    let userToDelete = await this.prisma.user.delete({
      where: { id: user.id },
    });

    return userToDelete;
  }

  async deleteAllUsers() {
    const users = await this.prisma.user.findMany({ select: { id: true } });
    let ids: Array<string> = [];
    users.map((user) => {
      return ids.push(user.id);
    });
    const userToDelete = await this.prisma.user.deleteMany({
      where: { id: { in: ids } },
    });

    return userToDelete;
  }
}
