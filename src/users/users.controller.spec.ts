import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
// import { beforeEach, describe, expect, it, vi, afterAll } from 'vitest';
import { prisma } from '../../prisma/index';
import { PrismaService } from '../prisma/prisma.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dtos/create-user.dto';
import { ForbiddenException } from '@nestjs/common';
import { ProductMorphology } from '../products/dtos/create-product.dto';
import { AbilityFactory } from '../ability/ability.factory';

describe(' tests on Users / controller and service and Auth', () => {
  let usersController: UsersController;
  let authService: AuthService;
  let service: UsersService;
  let prismaService: PrismaService;

  // var mockPrisma = prismaMock.product.create.mockResolvedValue(product);
  // beforeAll(async () => {
  //   await ProductFactory.create();
  // });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        AuthService,
        JwtService,
        AbilityFactory,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          return request.session.userId;
        },
      })
      .compile();
    authService = module.get<AuthService>(AuthService);
    usersController = module.get<UsersController>(UsersController);
    //   service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  afterAll(async () => {
    await usersController.deleteAllUsers();

    await prisma.$disconnect();
  });
  let email = faker.internet.exampleEmail();
  let id = faker.internet.password(20, true, /[A-Z]/);
  let delivryId = Math.floor(Math.random() * 1000);

  const newUser = {
    email: `nestor@test.fr`,
    password: 'azerty64',
    firstname: 'fanny',
    lastname: 'martin',

    adress_Delivery: {
      number: 24,
      street: 'rue du port',
      postcode: 59000,
      city: 'Lille',
      country: 'France',
    },
    morphology: ProductMorphology.V,
    size: '173cm',
    weight: '58kg',
  };
  describe('Users test ', () => {
    describe('first create an user', () => {
      it('should be equal', async () => {
        expect(await usersController.signUp(newUser)).toEqual(
          expect.objectContaining({
            email: `nestor@test.fr`,

            morphology: 'V',
            size: '173cm',
            weight: '58kg',
            admin: null,
            token: null,
            firstname: 'fanny',
            lastname: 'martin',
            stripeCustomerID: null,
          })
        );
      });
    });

    describe('then, create new user with same email should trhow 401 error', () => {
      it('it should throw 401 error', async () => {
        expect(usersController.signUp(newUser)).rejects.toThrow(
          ForbiddenException
        );
      });
    });
    it('should be defined', () => {});
  });
});
