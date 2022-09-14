import { CartsController } from 'src/carts/carts.controller';

import {
  IsProductOnCartResult,
  productOnCartData,
  productOnCartOutput,
  productOnCartOutputAllSizes,
} from '../data/productOnCart';
import { newCartResult } from '../data/resultCart';

export function MockedCart(service) {
  service.isCart = jest.fn((cartid) => {
    return new Promise((resolve, reject) => {
      resolve(newCartResult);
    });
  });
}

export function MockedNewCart(service) {
  service.newCart = jest.fn((addProductData) => {
    return new Promise((resolve, reject) => {
      resolve(newCartResult);
    });
  });
}

export function MockedNoProductOnCart(service) {
  service.isProductOnCart = jest.fn((addProductData) => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  });
}

export function MockedProductAlreadyOnCart(service) {
  service.QuantityInCartByProduct = jest.fn((addProductData) => {
    return new Promise((resolve, reject) => {
      let cart = JSON.parse(JSON.stringify(newCartResult));
      let quantityInCart = {
        products: [{ quantityInCart: cart.products[0].quantityInCart }],
      };
      resolve(quantityInCart);
    });
  });
}

export function MockedIsProductOnCart(service) {
  service.isProductOnCart = jest.fn((addProductData) => {
    return new Promise((resolve, reject) => {
      resolve(productOnCartOutput);
    });
  });
}

export function MockedIsProductOnCartAllSize(service) {
  service.isProductOnCartAllSize = jest.fn((addProductData) => {
    return new Promise((resolve, reject) => {
      resolve(productOnCartOutputAllSizes);
    });
  });
}

export function MockedErrorMessage(service, message) {
  service.sendErrorMessageOnCart = jest.fn((addProductData) => {
    let cart = JSON.parse(JSON.stringify(newCartResult));
    cart.error_Message = { ...cart.error_Message, error: message };
    return new Promise((resolve, reject) => {
      resolve(cart);
    });
  });
}

export function MockedHandleQuantityShort(service, size) {
  service.HandleQuantityShort = jest.fn((size) => {
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
}

//   service.prisma.cart.update = jest.fn().mockImplementation((total) => {
//     return new Promise((resolve, reject) => {
//       let quantity_available =
//         newCart.products[0].product.quantity_available[size];
//       newCart.products[0].quantityInCart = quantity_available;
//       newCart.total = total.data.total;
//       resolve(newCart);
//     });
//   });
