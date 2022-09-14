import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CartsService } from './carts/carts.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
// import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        CartsService,
        JwtService,
        PrismaService,
        UsersService,
        ProductsService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.root()).toBe('Hello World!');
    });
  });
});
