import { formerCart } from '../data/formerCartData';
import {
  productOnCartOutput,
  productPushedOnCart,
} from '../data/productOnCart';
import { newCartResult } from '../data/resultCart';

export function MockedNoOlderCart(service) {
  service.prisma.user.findFirst = jest.fn().mockImplementation((size) => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  });
}

export function MockedOlderCart(service) {
  service.prisma.user.findFirst = jest.fn().mockImplementation((size) => {
    return new Promise((resolve, reject) => {
      resolve(formerCart);
    });
  });
}

export function MockedAddProdutToCart(service) {
  service.addProductToCart = jest.fn().mockImplementation((total) => {
    return new Promise((resolve, reject) => {
      let productPushed = JSON.parse(JSON.stringify(productPushedOnCart));

      let newCart = JSON.parse(JSON.stringify(newCartResult));
      newCart.products.push(productPushedOnCart);
      newCart.total = total.data.total;

      resolve(newCart);
    });
  });
}

export function MockedUpdateTotalPrice(service, size) {
  service.updateTotalCart = jest.fn(() => {
    return new Promise((resolve, reject) => {
      let newCart = JSON.parse(JSON.stringify(newCartResult));
      let quantity_available =
        newCart.products[0].product.quantity_available[size];
      let finalTotal = newCart.products[0].product.price * quantity_available;

      newCart.total = finalTotal;
      resolve(newCart.total);
    });
  });
}

// export function MockedCheckQuantity(service) {
//   service.isProductOnCart = jest.fn((addProductData) => {
//     return new Promise((resolve, reject) => {
//       resolve();
//     });
//   });
//}
