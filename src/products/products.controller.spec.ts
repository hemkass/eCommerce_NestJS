import { Test, TestingModule } from '@nestjs/testing';
const sinon = require('sinon');

// import {
//   beforeEach,
//   describe,
//   expect,
//   it,
//   vi,
//   afterAll,
//   beforeAll,
// } from 'vitest';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { PrismaService } from '../prisma/prisma.service';

import {
  productObjectData,
  productObjectExpected,
} from './utils/TestsDatas/product-object';
import { productCreateExample } from './utils/OpenAPiExamples/productCreateExample';
let controller: ProductsController;
let productController;
let productService: ProductsService;
let prismaService: PrismaService;
let date = new Date();
let title = 'T-shirt col tunisien manches courtes';
let productTested = productObjectData;
productTested.title = title;
let dbproduct = productCreateExample;
import { prisma } from '../../prisma/index';
import { ProductMorphology } from './dtos/create-product.dto';
import { Product, Role, Size } from '@prisma/client';
import { prismaMock } from '../../singleton';
import { ignoreElements } from 'rxjs';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AbilityFactory } from '../ability/ability.factory';
import { AbilitiesGuard } from '../../guards/role.guard';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { response } from 'express';
import { getMockRes } from '@jest-mock/express';
describe('Product controller', () => {
  let AbilityMock = jest.fn((isAllowed) => {
    return new Promise((resolve, reject) => {
      isAllowed === true;
      resolve(isAllowed);
    });
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService, AbilityFactory],
    })

      .overrideGuard(AbilitiesGuard)
      .useValue({ canActivate: () => true })

      .compile();
    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('test middleware product', () => {
    it('should return an error ', () => {
      let updateFn = () => {};
    });
  });

  describe('should create a product', () => {
    it('should contain categories', async () => {
      let user = {
        sub: 1661781998,
        email: 'marine@test.fr',
        id: '41bf1728-b451-42f4-8d70-71f31d05176c',
        size: '173cm',
        admin: null,
        role: Role.ADMIN,
        lastname: 'martin',
      };
      let createFn = await productController.createProduct(productTested, user);

      expect(createFn).toEqual(
        expect.objectContaining({ categories: productTested.categories })
      );
    });

    it('should contain quantities available', async () => {
      let user = {
        sub: 1661781998,
        email: 'marine@test.fr',
        id: '41bf1728-b451-42f4-8d70-71f31d05176c',
        size: '173cm',
        admin: null,
        role: Role.ADMIN,
        lastname: 'martin',
      };
      let createFn = await productController.createProduct(productTested, user);
      expect(createFn.quantity_available.ProductQuantityId).toBeTruthy();
    });
    it('should contain sustainable', async () => {
      let user = {
        sub: 1661781998,
        email: 'marine@test.fr',
        id: '41bf1728-b451-42f4-8d70-71f31d05176c',
        size: '173cm',
        admin: null,
        role: Role.ADMIN,
        lastname: 'martin',
      };
      productTested.sustainable = {
        isActive: true,
        description: 'Choisir un produit labellisé',
      };

      let createFn = await productController.createProduct(productTested, user);
      expect(createFn.sustainable.sustainableId).toBeTruthy();
    });
    it('should contain pictures', async () => {
      let user = {
        sub: 1661781998,
        email: 'marine@test.fr',
        id: '41bf1728-b451-42f4-8d70-71f31d05176c',
        size: '173cm',
        admin: null,
        role: Role.ADMIN,
        lastname: 'martin',
      };
      productTested.pictures = [
        {
          src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
          stylePicture: 'chill',
          morphoPicture: ProductMorphology.A,
          sizePicture: Size.S,
        },
        {
          src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
          stylePicture: 'chill',
          morphoPicture: ProductMorphology.A,
          sizePicture: Size.S,
        },
      ];

      let createFn = await productController.createProduct(productTested, user);
      expect(createFn.pictures[1].src).toBeTruthy();
    });
  });
  describe(' Create and Update controller ', () => {
    // let product = await productController.createProduct(productTested);
    // it('should contain categories', () => {});

    beforeAll(async () => {});
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [ProductsController],
        providers: [ProductsService, PrismaService, AbilityFactory],
      })
        .overrideGuard(AbilitiesGuard)
        .useValue({ canActivate: () => true })
        .compile();
      productController = module.get<ProductsController>(ProductsController);
      productService = module.get<ProductsService>(ProductsService);
      prismaService = module.get<PrismaService>(PrismaService);
    });
    afterEach(async () => {
      await prisma.$disconnect();
    });

    describe('should return created product', () => {
      let user = {
        sub: 1661781998,
        email: 'marine@test.fr',
        id: '41bf1728-b451-42f4-8d70-71f31d05176c',
        size: '173cm',
        admin: null,
        role: Role.ADMIN,
        lastname: 'martin',
      };
      it('should be defined', () => {
        expect(productController).toBeDefined();
      });
      it('', async () => {
        let createFn = await productController.createProduct(
          productTested,
          user
        );
        expect(createFn).toEqual(
          expect.objectContaining({ categories: productTested.categories })
        );
      });
      it('', async () => {
        let createFn = await productController.createProduct(
          productTested,
          user
        );
        expect(createFn.quantity_available.ProductQuantityId).toBeTruthy();
      });
      it('should create sustainable', async () => {
        productTested.sustainable = {
          isActive: true,
          description: 'Choisir un produit labellisé',
        };
        let createFn = await productController.createProduct(
          productTested,
          user
        );
        expect(createFn.sustainable.sustainableId).toBeTruthy();
      });
      it('should create picture', async () => {
        productTested.pictures = [
          {
            src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
            stylePicture: 'chill',
            morphoPicture: ProductMorphology.A,
            sizePicture: 'S',
          },
          {
            src: 'https://res.cloudinary.com/dyj84szrx/image/upload/v1655884761/teeshirt/girl-926199_1920_aeityg.jpg',
            stylePicture: 'chill',
            morphoPicture: 'A',
            sizePicture: Size.S,
          },
        ];

        let createFn = await productController.createProduct(
          productTested,
          user
        );
        expect(createFn.pictures[1].src).toEqual(productTested.pictures[1].src);
      });
      //@ts-ignore
    });
    describe('should update a update title product ', () => {
      let product;
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [ProductsController],
          providers: [ProductsService, PrismaService, AbilityFactory],
        })
          .overrideGuard(AbilitiesGuard)
          .useValue({ canActivate: () => true })
          .compile();
        productController = module.get<ProductsController>(ProductsController);
        productService = module.get<ProductsService>(ProductsService);
        prismaService = module.get<PrismaService>(PrismaService);
      });
      afterEach(async () => {
        await prisma.$disconnect();
      });
      beforeAll(async () => {
        product = await prisma.product.findFirst({
          where: { title: title },
        });
      });

      // @ts-ignore
      // prismaMock.product.update.mockResolvedValue(productToSend);

      it('should contain title', async () => {
        if (product) {
          let productToUpdate = JSON.parse(JSON.stringify(product));
          const productData = {
            productToUpdate: productToUpdate.id,
            toUpdate: {
              title: 'ceci devrait etre  le title updated',
            },
          };
          let updateFn = await productController.updateProduct(
            productData,
            product
          );
          expect(updateFn.title).toContain(productData.toUpdate.title);
        }
      });

      it('should reject the update', async () => {
        // @ts-ignore

        let productToUpdate = JSON.parse(JSON.stringify(product));
        productToUpdate.id = 1;
        const productData = {
          productToUpdate: productToUpdate.id,
          toUpdate: {
            title: 'ceci devrait etre  le title updated',
          },
        };
        let updateFn = async () => {
          await productController.updateProduct(productData);
        };
        expect(updateFn).rejects.toThrow();
      });
    });
    describe('should update a update quantity available for a  product ', () => {
      let product;
      let updatefn;
      let productData;
      beforeAll(async () => {
        product = await prisma.product.findFirst({
          include: { quantity_available: true },
          where: { title: title },
        });
      });

      // @ts-ignore
      // prismaMock.product.update.mockResolvedValue(productToSend);
      it('should exist', async () => {
        if (product) {
          productData = {
            productToUpdate: product.id,
            toUpdate: {
              quantity_available: { XS: 5 },
            },
          };
        }

        updatefn = await productController.updateProduct(productData, product);
        expect(updatefn.quantity_available.XS).toEqual(5);
      });
    });

    //   it('should delete this product from db', async () => {
    //     let product = await prisma.product.findFirst({ where: { title: title } });
    //     if (product) {
    //       expect(await productController.deleteProduct(product.id)).toBeTruthy();
    //       // @ts-ignore
    //       product.id = 1;
    //       expect(productController.deleteProduct(product.id)).rejects.toThrow();
    //       let ids = 'tesrfhfkgghotyu';
    //       expect(productController.deleteProduct(ids)).rejects.toThrow();
    //     }
    //   });
  });
  describe('delete', () => {
    it('should reset Db product', async () => {
      let products = await prisma.product.findMany();
      let ids: [string] | [] = [];
      if (products) {
        products.map((productItem: Product): any => {
          // @ts-ignore
          ids.push(productItem.id);
        });

        const { res, next } = getMockRes({
          message: 'ok',
        });
        await productController.deleteManyProducts(ids, res);

        // expect(res.message).toEqual('ok');
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: expect.stringMatching('succesfully suppressed'),
          })
        );
      }
    });
    it('should return error if ids is a number', async () => {
      // @ts-ignore
      let ids = 1;
      expect(productController.deleteProduct(ids)).rejects.toThrow();
    });

    it('should return a number if ids is string', async () => {
      // @ts-ignore
      let ids = 'tesrfhfkgghotyu';

      expect(productController.deleteProduct(ids)).rejects.toThrow();
    });
  });
});
