import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { prisma } from '../../prisma/index';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CartsService } from './carts.service';
import { cartWithOwnerResult } from './test/data/cartWithOwner';
import { newCartResult } from './test/data/resultCart';
import {
  MockedAddProdutToCart,
  MockedNoOlderCart,
  MockedOlderCart,
  MockedUpdateTotalPrice,
} from './test/mock/addOwnerToCart-Mock';
import {
  productOnCartData,
  productPushedOnCart,
  twoProductOncart,
} from './test/data/productOnCart';
import {
  MockedCart,
  MockedErrorMessage,
  MockedHandleQuantityShort,
  MockedIsProductOnCart,
  MockedIsProductOnCartAllSize,
  MockedNewCart,
  MockedNoProductOnCart,
  MockedProductAlreadyOnCart,
} from './test/mock/addProductToCart-Mock';
import { prismaMock } from '../../singleton';
let service;
let prismaService: PrismaService;
// let MockedPrisma = jest.mock('PrismaService', () => {
//   return {
//     cart: {
//       update: jest.fn((createCartData) => {
//         return new Promise((resolve, reject) => {
//           resolve(newCartResult);
//         });
//       }),
//       create: jest.fn(() => {
//         return new Promise((resolve, reject) => {
//           resolve(newCartResult);
//         });
//       }),
//     },
//   };
// });

describe('cart service ', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService, CartsService],
    }).compile();

    service = module.get<CartsService>(CartsService);

    prisma.cart.findUnique = jest.fn().mockResolvedValueOnce(newCartResult);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  afterAll(async () => {
    await service.deleteAllCarts();
    await prisma.$disconnect();
  });
  describe('calculateTotalCartFn', () => {
    it('should recalculate price if quantity is changing', async () => {
      let recalculatedCart = JSON.parse(JSON.stringify(newCartResult));
      recalculatedCart.products[0].quantityInCart = 10;
      let cartId = newCartResult.id;
      service.isCart = jest.fn((cartid) => {
        return new Promise((resolve, reject) => {
          resolve(recalculatedCart);
        });
      });
      let calculPricefn = await service.calculateTotalCart(cartId);
      // expect(calculPricefn).toEqual(cart);
      expect(calculPricefn).toEqual(120);
    });
    it('should recalculate price if quantity is changing for the two Products', async () => {
      let cartToCalculate = JSON.parse(JSON.stringify(twoProductOncart));
      cartToCalculate.products[0].quantityInCart = 2;
      let cartId = newCartResult.id;
      service.isCart = jest.fn((cartid) => {
        return new Promise((resolve, reject) => {
          resolve(cartToCalculate);
        });
      });
      let calculPricefn = await service.calculateTotalCart(cartId);
      // expect(calculPricefn).toEqual(cart);
      expect(calculPricefn).toEqual(36);
    });
  });

  describe('checkQuantityInCart', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ProductsService, PrismaService, CartsService],
      }).compile();

      service = module.get<CartsService>(CartsService);

      service.removeFromCart = jest.fn((data) => {
        return new Promise((resolve, reject) => {
          resolve({
            message: `Your product  has been succesfully suppress from cart  `,
          });
        });
      });
      service.sendErrorMessageOnCart = jest.fn((json, cartId) => {
        return new Promise((resolve, reject) => {
          resolve(json);
        });
      });

      service.sendErrorMessageOnCart = jest.fn((json, cartId) => {
        return new Promise((resolve, reject) => {
          resolve(json);
        });
      });
      service.HandleQuantityShort = jest.fn((dataQuantityShort) => {
        return new Promise((resolve, reject) => {
          resolve(
            `quantity update with new quantity ${dataQuantityShort.availableQuantity} `
          );
        });
      });
    });
    afterEach(async () => {
      await prisma.$disconnect();
    });
    it('if quantity available left = 0, it should delete product from cart', async () => {
      let cart = JSON.parse(JSON.stringify(newCartResult));
      cart.products[0].product.quantity_available[cart.products[0].size] = 0;

      await service.checkQuantityInCart(cart);

      expect(service.removeFromCart).toHaveBeenCalled();
      // cart.products[0].quantityInCart = 10;
      // expect(checkfn);
    });
    it('if there is quantity available left but not enough should handle the shortage', async () => {
      let cart = JSON.parse(JSON.stringify(newCartResult));
      cart.products[0].product.quantity_available[cart.products[0].size] = 2;

      await service.checkQuantityInCart(cart);

      expect(service.HandleQuantityShort).toHaveBeenCalled();
    });
  });
  describe('addProductToCart', () => {
    let product = JSON.parse(JSON.stringify(productOnCartData));
    let cartToAddProduct = JSON.parse(JSON.stringify(newCartResult));
    let productId = product.id;
    describe('case where product is already in my cart ', () => {
      describe('Case quantity is enough', () => {
        // let size = 'M';
        let quantityWanted = 1;
        let size = 'M';
        let quantity_available =
          cartToAddProduct.products[0].product.quantity_available[size];
        let productId = product.id;
        let addProductData = { product, size, productId, quantityWanted };

        addProductData.quantityWanted = 1;
        let newCart = JSON.parse(JSON.stringify(newCartResult));
        let quantityExpected =
          Number(addProductData.quantityWanted) +
          Number(newCart.products[0].quantityInCart);

        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, PrismaService, CartsService],
          }).compile();
          MockedCart(service);
          MockedNewCart(service);
          MockedIsProductOnCart(service);
          MockedProductAlreadyOnCart(service);
          MockedUpdateTotalPrice(service, size);
          // service.updateTotalCart = jest.fn((size) => {
          //   return new Promise((resolve, reject) => {
          //     let newCart = JSON.parse(JSON.stringify(newCartResult));
          //     let finalTotal =
          //       newCart.products[0].product.price * quantity_available;

          //     newCart.total = finalTotal;
          //     resolve(newCart.total);
          //   });
          // });

          service.prisma.cart.update = jest.fn().mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              let newQuantity =
                Number(newCart.products[0].quantityInCart) +
                Number(addProductData.quantityWanted);
              newCart.products[0].quantityInCart = newQuantity;
              newCart.total = total.data.total;
              resolve(newCart);
            });
          });
        });

        afterEach(async () => {
          await prisma.$disconnect();
        });

        it('check if quantity  on cart is correct', async () => {
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.products[0].quantityInCart).toBe(
            quantityExpected
          );
        });
        it('check if total on cart is correct', async () => {
          let newCart = JSON.parse(JSON.stringify(newCartResult));

          let total = quantityExpected * newCart.products[0].product.price;
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.total).toBe(total);
        });
      });
      describe('Case quantity is not enough', () => {
        let size = 'M';
        let quantityWanted = 5;
        let addProductData = { product, size, productId, quantityWanted };

        let newCart = JSON.parse(JSON.stringify(newCartResult));
        let quantityExpected =
          newCart.products[0].product.quantity_available[size];
        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, PrismaService, CartsService],
          }).compile();

          MockedNewCart(service);
          MockedIsProductOnCart(service);
          MockedProductAlreadyOnCart(service);
          MockedHandleQuantityShort(service, size);
          let cartToSend = MockedHandleQuantityShort(service, size);
          service.isCart = jest.fn().mockImplementation((size) => {
            return new Promise((resolve, reject) => {
              let size = 'M';
              let cart = JSON.parse(JSON.stringify(newCartResult));
              cart.products[0].quantityInCart =
                cart.products[0].product.quantity_available[size];
              cart.total =
                cart.products[0].product.quantity_available[size] *
                cart.products[0].product.price;

              resolve(cart);
            });
          });
        });

        afterEach(async () => {
          await prisma.$disconnect();
        });
        it('Check if  HandleQuantityShort have been called', async () => {
          let addProductFn = await service.addProductToCart(addProductData);
          expect(service.HandleQuantityShort).toHaveBeenCalled();
        });

        it('check if quantity  on cart is correct', async () => {
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.products[0].quantityInCart).toBe(
            quantityExpected
          );
        });
        it('check if total on cart is correct', async () => {
          let newCart = JSON.parse(JSON.stringify(newCartResult));

          let total = quantityExpected * newCart.products[0].product.price;
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.total).toBe(total);
        });
      });
    });
    describe('case where product is not already in my cart', () => {
      describe('quantity is enough ', () => {
        let quantityWanted = 2;
        let size = 'M';

        let addProductData = { product, size, productId, quantityWanted };
        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, PrismaService, CartsService],
          }).compile();
          service = module.get<CartsService>(CartsService);
          // service.isProductOnCart = jest.fn((addProductData) => {
          //   return new Promise((resolve, reject) => {
          //     resolve(productOnCartData);
          //   });
          // });
          MockedCart(service);
          MockedNoProductOnCart(service);
          MockedNewCart(service);

          // prisma.cart.findUnique = jest
          //   .fn()
          //   .mockResolvedValueOnce(newCartResult);

          service.prisma.cart.update = jest.fn().mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              let productPushed = JSON.parse(
                JSON.stringify(productPushedOnCart)
              );
              productPushedOnCart.quantityInCart = quantityWanted;
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              newCart.products.push(productPushedOnCart);
              newCart.total = total.data.total;

              resolve(newCart);
            });
          });
          service.isCart = jest.fn().mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              let productPushed = JSON.parse(
                JSON.stringify(productPushedOnCart)
              );

              productPushedOnCart.quantityInCart = quantityWanted;

              newCart.products.push(productPushed);
              newCart.total = total;

              resolve(newCart);
            });
          });

          service.updateTotalCart = jest.fn(() => {
            return new Promise((resolve, reject) => {
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              let finalTotal =
                newCart.products[0].product.price *
                  newCart.products[0].quantityInCart +
                quantityWanted * productPushedOnCart.product.price;
              newCart.total = finalTotal;
              resolve(newCart.total);
            });
          });
        });
        afterEach(async () => {
          await prisma.$disconnect();
        });
        it('Check if total is correct', async () => {
          let result = JSON.parse(JSON.stringify(twoProductOncart));
          let addProductFn = await service.addProductToCart(addProductData);
          let expectedPrice =
            newCartResult.products[0].product.price *
              newCartResult.products[0].quantityInCart +
            quantityWanted * productPushedOnCart.product.price;
          expect(addProductFn.total).toBe(expectedPrice);
          // expect(testfn.products[0].).;
        });
        it('check if quantity of each product on cart is correct', async () => {
          let result = JSON.parse(JSON.stringify(twoProductOncart));
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.products[0].quantityInCart).toBe(3);
          expect(addProductFn.products[1].quantityInCart).toBe(2);
          // expect(testfn.products[0].).;
        });
      });
      describe('quantity is not enough ', () => {
        let quantityWanted = 5;

        let size = 'M';
        let quantity_available =
          cartToAddProduct.products[0].product.quantity_available[size];

        let addProductData = { product, size, productId, quantityWanted };
        beforeEach(async () => {
          const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, PrismaService, CartsService],
          }).compile();
          service = module.get<CartsService>(CartsService);

          MockedCart(service);
          MockedNoProductOnCart(service);
          MockedNewCart(service);

          let message = {
            error: `only ${quantity_available} "left"for product ${productOnCartData.id}`,
          };
          MockedErrorMessage(service, message);

          // prisma.cart.findUnique = jest
          //   .fn()
          //   .mockResolvedValueOnce(newCartResult);

          service.prisma.cart.update = jest.fn().mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              let productPushed = JSON.parse(
                JSON.stringify(productPushedOnCart)
              );
              let quantity_available =
                productOnCartData.quantity_available[size];

              productPushedOnCart.quantityInCart = quantity_available;

              newCart.products.push(productPushedOnCart);
              newCart.total = total.data.total;

              resolve(newCart);
            });
          });

          service.isCart = jest.fn().mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              let newCart = JSON.parse(JSON.stringify(newCartResult));
              let productPushed = JSON.parse(
                JSON.stringify(productPushedOnCart)
              );
              let quantity_available =
                productOnCartData.quantity_available[size];

              productPushedOnCart.quantityInCart = quantity_available;

              newCart.products.push(productPushedOnCart);
              newCart.total = total;

              resolve(newCart);
            });
          });
        });

        afterEach(async () => {
          await prisma.$disconnect();
        });

        it('Check if error message fn is called', async () => {
          let addProductFn = await service.addProductToCart(addProductData);
          expect(service.sendErrorMessageOnCart).toHaveBeenCalled();
        });
        it('check if quantity of each product on cart is correct', async () => {
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.products[1].quantityInCart).toBe(
            quantity_available
          );
        });
        it('check if total on cart is correct', async () => {
          let newCart = JSON.parse(JSON.stringify(newCartResult));

          let total =
            newCart.total +
            quantity_available * newCart.products[0].product.price;
          let addProductFn = await service.addProductToCart(addProductData);
          expect(addProductFn.total).toBe(total);
        });
      });
    });

    // two different mocks for IsProduct on card according test (if the product is or is,n't on my cart)
    // });
  });

  describe('delete product from cart fn', () => {
    let cart = JSON.parse(JSON.stringify(twoProductOncart));
    let productId = cart.products[0].productId;
    let cartId = cart.id;

    describe('Case1 : remove a part of the quantity but some quantity of product left on cart ', () => {
      const size = 'M';
      const quantity = 1;
      let totalExpected =
        cart.total - cart.products[0].product.price * quantity;
      let expectedQuantity = Number(cart.products[0].quantityInCart) - quantity;
      let newCart = JSON.parse(JSON.stringify(cart));
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ProductsService, PrismaService, CartsService],
        }).compile();
        service = module.get<CartsService>(CartsService);

        MockedIsProductOnCart(service);

        service.updateTotalCart = jest.fn().mockImplementation((cartId) => {
          return new Promise((resolve, reject) => {
            newCart.products[0].quantityInCart =
              cart.products[0].quantityInCart - quantity;
            newCart.total = cart.total - 1 * cart.products[0].product.price;
            resolve(newCart);
          });
        });

        service.prisma.productsOnCart.delete = jest
          .fn()
          .mockImplementation((size) => {
            return new Promise((resolve, reject) => {
              resolve(newCartResult);
            });
          });

        service.prisma.cart.update = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            let newCart = JSON.parse(JSON.stringify(cart));
            newCart.products[0].quantityInCart =
              cart.products[0].quantityInCart - quantity;
            resolve(newCart);
          });
        });
      });
      afterEach(async () => {
        await prisma.$disconnect();
      });
      it('check quantity in cart', async () => {
        let quantityIncartDATA = {
          productId: productId,
          cartId: cartId,
          size: size,
          quantity: quantity,
        };
        let removeFn = await service.removeFromCart(quantityIncartDATA);

        expect(removeFn.products[0].quantityInCart).toEqual(expectedQuantity);
      });
      //   it('check total cart updated', async () => {
      //     let quantityIncartDATA = {
      //       productId: productId,
      //       cartId: cartId,
      //       size: size,
      //       quantity: quantity,
      //     };
      //     let removeFn = await service.removeFromCart(quantityIncartDATA);

      //     expect(removeFn.total).toEqual(totalExpected);
      //   });
    });

    describe('Case2 : remove all quantity for one size', () => {
      const size = 'S';

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ProductsService, PrismaService, CartsService],
        }).compile();
        service = module.get<CartsService>(CartsService);

        MockedIsProductOnCart(service);

        service.prisma.productsOnCart.delete = jest
          .fn()
          .mockImplementation((size) => {
            return new Promise((resolve, reject) => {
              resolve(`all product for size ${size} has been disconnect`);
            });
          });

        service.prisma.productsOnCart.delete = jest
          .fn()
          .mockImplementation((size) => {
            return new Promise((resolve, reject) => {
              resolve(newCartResult);
            });
          });

        service.updateTotalCart = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            resolve(newCartResult);
          });
        });

        service.prisma.cart.update = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            resolve(`all product for size ${size} has been disconnect`);
          });
        });
      });
      afterEach(async () => {
        await prisma.$disconnect();
      });
      it('product disconnect', async () => {
        let quantityIncartDATA = {
          productId: productId,
          cartId: cartId,
          size: size,
        };
        await service.removeFromCart(quantityIncartDATA);

        expect(service.prisma.cart.update).toHaveBeenCalled();
      });

      it('productOnCart deleted', async () => {
        let quantityIncartDATA = {
          productId: productId,
          cartId: cartId,
          size: size,
        };
        await service.removeFromCart(quantityIncartDATA);

        expect(service.prisma.productsOnCart.delete).toHaveBeenCalled();
      });

      it('Cart Total is updated without the deleted product', async () => {
        let quantityIncartDATA = {
          productId: productId,
          cartId: cartId,
          size: size,
        };
        await service.removeFromCart(quantityIncartDATA);

        expect(service.prisma.cart.update).toHaveBeenCalled();
      });
    });
    describe('Case3 : Remove all sizes, and the whole product from cart.', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ProductsService, PrismaService, CartsService],
        }).compile();
        service = module.get<CartsService>(CartsService);

        MockedIsProductOnCartAllSize(service);

        service.prisma.productsOnCart.deleteMany = jest
          .fn()
          .mockImplementation((total) => {
            return new Promise((resolve, reject) => {
              resolve('all carts have been erased');
            });
          });
      });
      afterEach(async () => {
        await prisma.$disconnect();
      });
      it('for all size', async () => {
        let quantityIncartDATA = {
          productId: productId,
          cartId: cartId,
        };

        await service.removeFromCart(quantityIncartDATA);

        expect(service.prisma.productsOnCart.deleteMany).toHaveBeenCalled();
      });
    });
  });

  describe('Add Owner fn', () => {
    let user = {
      sub: 1661781998,
      email: 'marine@test.fr',
      id: '41bf1728-b451-42f4-8d70-71f31d05176c',
      size: '173cm',
      admin: null,
      lastname: 'martin',
    };

    let message = {
      error: `only 4 "left"for product this product`,
    };
    let cart = JSON.parse(JSON.stringify(newCartResult));

    describe('no former cart', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ProductsService, PrismaService, CartsService],
        }).compile();
        service = module.get<CartsService>(CartsService);

        MockedNoOlderCart(service);

        service.checkQuantityInCart = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            resolve(newCartResult);
          });
        });

        service.prisma.cart.update = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve(cartWithOwnerResult);
          });
        });
      });

      afterEach(async () => {
        await prisma.$disconnect();
      });

      it('should send a cart with the owner (mail+id)', async () => {
        let cart = JSON.parse(JSON.stringify(newCartResult));

        let data = { user, cart };
        let addOwnerFn = await service.addOwnerCart(data);
        expect(addOwnerFn).toEqual(cartWithOwnerResult);
      });
    });
    describe('should merge former cart with new one and keep the former with the owner', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ProductsService, PrismaService, CartsService],
        }).compile();
        service = module.get<CartsService>(CartsService);
        let size = MockedOlderCart(service);
        MockedAddProdutToCart(service);
        MockedErrorMessage(service, message);
        MockedUpdateTotalPrice(service, size);
        service.checkQuantityInCart = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            resolve(newCartResult);
          });
        });

        service.prisma.cart.update = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve(cartWithOwnerResult);
          });
        });

        service.deleteWholeCart = jest.fn().mockImplementation((size) => {
          return new Promise((resolve, reject) => {
            resolve('your cart has been deleted');
          });
        });
      });

      afterEach(async () => {
        await prisma.$disconnect();
      });
      describe('STEP1: should merge error(s), if there is error in the new cart', () => {
        it('error have been called ', async () => {
          let cart = JSON.parse(JSON.stringify(newCartResult));
          cart.error_Message = message;
          let data = { user, cart };

          await service.addOwnerCart(data);
          expect(service.sendErrorMessageOnCart).toHaveBeenCalled();
        });

        describe('STEP2: should merge product(s), if there is error in the new cart', () => {
          it('add product one by one', async () => {
            let cart = JSON.parse(JSON.stringify(twoProductOncart));
            let data = { user, cart };
            let numberOfCalled = Number(twoProductOncart.products.length);
            let mergeFn = await service.addOwnerCart(data);
            expect(service.addProductToCart).toHaveBeenCalledTimes(
              numberOfCalled
            );
          });
          it('delete have been called', async () => {
            let data = { user, cart };

            let mergeFn = await service.addOwnerCart(data);
            expect(service.deleteWholeCart).toHaveBeenCalledWith(cart);
          });
        });
      });
    });
  });
});
