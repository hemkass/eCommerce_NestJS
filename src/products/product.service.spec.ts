// import { beforeEach, describe, expect, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {
  productObjectData,
  productObjectExpected,
} from './utils/TestsDatas/product-object';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../../singleton';
import { newProduct, ProductsList } from './utils/TestsDatas/product-result';
import { CreateProductDto, Sustainable } from './dtos/create-product.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { productDto } from './dtos/product.dto';

import { productCreateExample } from './utils/OpenAPiExamples/productCreateExample';
import { Brand, Categories, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../prisma/index';
import { ProductsController } from './products.controller';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AbilityFactory } from '../ability/ability.factory';

let productMocked = ProductsList[0];
let service;
let prismaService: PrismaService;
let productToTest;

const db = {
  product: {
    findMany: jest.fn().mockResolvedValue(ProductsList),
    findUnique: jest.fn().mockResolvedValue(productMocked),
    findFirst: jest.fn().mockResolvedValue(productMocked),
    create: jest.fn().mockReturnValue(productMocked),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(productMocked),
    delete: jest.fn().mockResolvedValue(productMocked),
  },
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService, AbilityFactory],
  }).compile();

  service = module.get<ProductsService>(ProductsService);
  productToTest = await service.createProduct(productObjectData);
});

afterEach(async () => {
  await prisma.$disconnect();
});

afterAll(async () => {
  await service.deleteAllProducts();
  await prisma.$disconnect();
});

describe('Product service : create Product functions', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService, AbilityFactory],
    })
      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should modify quantity available for each size sended', async () => {
    let quantity_available = {
      XS: 5,
      S: 1,
    };

    let expected = { XXS: 0, XS: 5, S: 1, M: 0, L: 0, XL: 0, XXL: 0 };

    let newQuantity = await service.sizeProductConstructor(quantity_available);

    expect(newQuantity).toEqual(expected);
  });

  it('it should create product object', async () => {
    const createProductData = productObjectData;

    service.CreateSustainableDB = jest.fn((data, productData) => {
      return new Promise((resolve, reject) => {
        productData.sustainable = { connect: { id: 3 } };
        resolve(productData);
      });
    });
    const testfn = await service.createProductObject(createProductData);

    expect(service.CreateSustainableDB).toHaveBeenCalled();
    productObjectExpected.sustainable = { connect: { id: 3 } };
    expect(testfn).toEqual(productObjectExpected);
  });
});

describe('Product service : GET Product functions', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });
  // it('get product should call createOrderByObject fn ', async () => {
  //   let datas = {
  //     categories: ['femme', 'vêtements'],
  //     filters: { priceSort: 'asc' },
  //   };
  //   service.createOrderByObject = jest.fn(() => {
  //     return new Promise((resolves, reject) => {
  //       resolves({ price: 'asc' });
  //     });
  //   });
  //   // prisma.product.findMany = jest.fn().mockReturnValue(newProduct);
  //   // prismaMock.product.findMany.mockResolvedValueOnce(ProductsList);
  //   let getproductsTest = await service.getproducts(datas);
  //   expect(getproductsTest).toBeCalledWith(datas.filters);
  // });

  // it('should send 0 result if not the goog categories ', async () => {
  //   let datas = {
  //     categories: { categories: ['test', Categories.Vetements] },
  //     filters: { priceSort: 'asc' },
  //   };
  //   service.createOrderByObject = jest.fn(() => {
  //     return new Promise((resolves, reject) => {
  //       resolves({ price: 'asc' });
  //     });
  //   });
  //   // prisma.product.findMany = jest.fn().mockReturnValue(newProduct);

  //   let getproductsTest = await service.getproducts(datas);
  //   expect(getproductsTest.count._count).toBe(0);
  // });

  describe('should create orderBy object', () => {
    let filters;

    it('should create orderBy object by priceSort', async () => {
      filters = { priceSort: 'asc' };
      const getProductfn = await service.createOrderByObject(filters);

      expect(getProductfn).toEqual({ price: 'asc' });
    });

    it('should create orderBy object by popularity', async () => {
      filters = { popularity: 'asc' };
      const getProductfn = await service.createOrderByObject(filters);

      expect(getProductfn).toEqual({ rating_avg: 'asc' });
    });
    it('should create orderBy object by sortdate', async () => {
      filters = { sortDate: 'asc' };
      const getProductfn = await service.createOrderByObject(filters);

      expect(getProductfn).toEqual({ created_at: `asc` });
    });

    it('if no filters, should order by date', async () => {
      const getProductfn = await service.createOrderByObject(filters);

      expect(getProductfn).toEqual({ created_at: `asc` });
    });
  });
});

describe('Product service : update Product functions', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });
  it('should update quantity available for each size sended', async () => {
    // let thisProduct = prismaMock.product.create.mockResolvedValue(newProduct);

    let formerQuantity = {
      XXS: 0,
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      XXXL: 0,
    };

    let toUpdate = {
      quantity_available: {
        XS: 5,
        S: 1,
      },
    };

    let expected = {
      update: {
        XXS: 0,
        XS: 5,
        S: 1,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
        XXXL: 0,
      },
    };

    let newQuantity = await service.createUpdateObject(toUpdate, {
      formerQuantity: formerQuantity,
    });

    expect(newQuantity.quantity_available).toEqual(expected);
  });

  it('should update fields', async () => {
    // let thisProduct = prismaMock.product.create.mockResolvedValue(newProduct);

    let toUpdate = {
      title: 'title updated',
      ref: 'new ref',
      brand: Brand.CHANEL,
      description: 'new description',
      price: 10,
    };

    let productUpdated = await service.createUpdateObject(toUpdate);

    expect(productUpdated).toMatchObject(toUpdate);
  });

  it('should send an error ', async () => {
    let toUpdate = {
      quantity_available: {
        XS: 5,
        S: 1,
      },
    };

    let expected = {
      quantity_available: {
        update: {
          XXS: 0,
          XS: 5,
          S: 1,
          M: 0,
          L: 0,
          XL: 0,
          XXL: 0,
          XXXL: 0,
        },
      },
    };
    let updatefn = service.createUpdateObject(toUpdate);

    expect(updatefn).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should update sustainable to true, enter description', async () => {
    let description = 'new description';
    let toUpdate = {
      sustainable: { isActive: true, description: description },
    };
    let updatefn = await service.createUpdateObject(toUpdate);

    let expected = {
      update: { isActive: true, description: `${description}` },
    };

    expect(updatefn.sustainable).toMatchObject(expected);
  });

  it('should update sustainable to false, and clean the former description', async () => {
    let toUpdate = { sustainable: { isActive: false } };
    let updatefn = await service.createUpdateObject(toUpdate);

    let expected = {
      update: { isActive: false, description: '' },
    };

    expect(updatefn.sustainable.update.description).toEqual('');
    expect(updatefn.sustainable.update.isActive).toEqual(false);
  });

  it('should send an error if someone send false with description', async () => {
    let toUpdate = {
      sustainable: { isActive: false, description: 'description sended' },
    };
    let updatefn = service.createUpdateObject(toUpdate);

    expect(updatefn).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('should send an error if someone doesnot send is active property', async () => {
    let toUpdate = {
      sustainable: { description: 'description sended' },
    };

    let updatefn = service.createUpdateObject(toUpdate);

    expect(updatefn).rejects.toBeInstanceOf(ForbiddenException);
  });
});

describe('create sustainable Db', () => {
  let service: ProductsService;
  let prisma;
  let prismaService: PrismaService;
  const prismaMock = mockDeep<PrismaClient>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        PrismaService,
        AbilityFactory,
        // {
        //   provide: prisma,
        //   useValue: prismaMock,
        // },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });
  it('if sustainable description is given, product should send back sustainable description', async () => {
    let sustainableDesc = 'description test';
    productObjectData.sustainable.description = sustainableDesc;

    const testfn = await service.createProduct(productObjectData);

    expect(testfn).toBeTruthy();
    expect(testfn.sustainable?.description).toContain(sustainableDesc);
  });
});

describe('get one or many product by id(s)', () => {
  let service: ProductsService;
  let prisma;
  let prismaService: PrismaService;
  const prismaMock = mockDeep<PrismaClient>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        PrismaService,
        AbilityFactory,
        // {
        //   provide: prisma,
        //   useValue: prismaMock,
        // },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });
  it('should return product by id with quantity available', async () => {
    let sustainableDesc = 'description test';
    productObjectData.sustainable.description = sustainableDesc;
    let quantity = productToTest.quantity_available;
    const testfn = await service.isProduct(productToTest.id);

    expect(testfn).toBeTruthy();
    expect(testfn?.quantity_available).toEqual(quantity);
  });
});

describe('update product with test database', () => {
  it('if no product throw an error', () => {
    let productToUpdate = productObjectData;
    // @ts-ignore
    productToUpdate.id = 'productId';
    let toUpdate = {
      title: 'title updated',
    };
    let product = { productToUpdate, toUpdate };

    let updateFn = async () => {
      await service.updateProducts(product);
    };

    expect(updateFn).rejects.toThrow(PrismaClientKnownRequestError);
  });

  it('update quantity available in Db', async () => {
    let productToUpdate = productToTest;

    let toUpdate = {
      quantity_available: {
        M: 20,
      },
    };

    let product = { productToUpdate, toUpdate };
    let { XXS, XS, S, M, L, XL, XXL, XXXL } =
      productToUpdate.quantity_available;

    let expected = {
      XXS: XXS,
      XS: XS,
      S: S,
      M: 20,
      L: L,
      XL: XL,
      XXL: XXL,
      XXXL: XXXL,
    };

    let newQuantity = await service.updateProducts(product);

    expect(newQuantity.quantity_available).toEqual(
      expect.objectContaining(expected)
    );
  });
  it('update basic data product in db', async () => {
    let productToUpdate = productToTest;
    let toUpdate = {
      title: 'title updated',
      ref: 'new ref',
      brand: Brand.CHANEL,
      description: 'new description',
      price: 50,
    };
    let product = { productToUpdate, toUpdate };

    let newProduct = await service.updateProducts(product);

    // expect(newQuantity).toMatchObject(toUpdate);
    expect(newProduct.price).toEqual(toUpdate.price);
    expect(newProduct.ref).toEqual(toUpdate.ref);
    expect(newProduct.brand).toEqual(toUpdate.brand);
  });
});
