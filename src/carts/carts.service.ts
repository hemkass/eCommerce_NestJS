import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';

import { CartDbData } from './custonType/CartDB';
import { addProductDTO } from './dtos/addProduct.dto';
import { AddToCartDTO } from './dtos/add_to_cart.dto';
import { QuantityShortDTO } from './dtos/quantity_short.dto';
import { Total_cartDTO } from './dtos/total_cart.dto';
@Injectable()
export class CartsService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductsService
  ) {}

  async isCart(cartId: string) {
    return await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        products: {
          include: {
            product: {
              select: {
                quantity_available: true,
                price: true,
                DeliveryDate: true,
              },
            },
          },
        },
      },
    });
  }

  async QuantityInCartByProduct(quantityIncartDATA) {
    let { ProductOnCartID, cartId, size } = quantityIncartDATA;

    if (ProductOnCartID) {
      return await this.prisma.cart.findFirst({
        select: { products: { select: { quantityInCart: true } } },
        where: {
          AND: [
            { id: cartId },
            {
              products: {
                some: {
                  AND: [{ id: ProductOnCartID.id }, { size: { equals: size } }],
                },
              },
            },
          ],
        },
      });
    } else {
      throw new NotFoundException('this product is not on cart');
    }
  }

  async isProduct(productId) {
    return await this.productService.isProduct(productId);
  }

  async isProductOnCart(quantityIncartDATA: Partial<addProductDTO>) {
    let { productId, cartId, size } = quantityIncartDATA;

    // Mainly to fetch size and id from the intermediary Prisma table (ProductsOnCart)
    const isProduct = await this.prisma.productsOnCart.findFirst({
      select: { id: true, size: true, quantityInCart: true },
      where: {
        AND: [{ cartId: cartId }, { productId: productId }, { size: size }],
      },
    });

    return isProduct;
  }

  // Same than above, but to find all the size of the same product in a cart (Array)
  async isProductOnCartAllSize(quantityIncartDATA: Partial<addProductDTO>) {
    let { productId, cartId } = quantityIncartDATA;

    // Mainly to fetch size and id from the intermediary Prisma table (ProductsOnCart)
    const isProducts = await this.prisma.productsOnCart.findMany({
      select: { id: true, size: true, quantityInCart: true },
      where: {
        AND: [{ cartId: cartId }, { productId: productId }],
      },
    });

    return isProducts;
  }

  async sendErrorMessageOnCart(json, cartId) {
    const currentError = await this.prisma.cart.findUnique({
      select: { error_Messages: true },
      where: { id: cartId },
    });
    // if there is no error yet, just update an error
    if (currentError) {
      if (currentError?.error_Messages[0] === 'JsonNull') {
        let newJson = json as Prisma.JsonArray;
        try {
          return await this.prisma.cart.update({
            where: { id: cartId },
            data: {
              error_Messages: newJson,
            },
          });
        } catch (error) {
          return new Error('Update error_Message failed');
        }
      } else {
        // if there is already an error, fetch the formers errors and add the new one
        let newJson = [
          ...currentError.error_Messages,
          ...json,
        ] as Prisma.JsonArray;
        try {
          return await this.prisma.cart.update({
            where: { id: cartId },
            data: {
              error_Messages: newJson,
            },
          });
        } catch (error) {
          return new Error('Update error_Message failed');
        }
      }
    }
  }

  async HandleQuantityShort(data: QuantityShortDTO) {
    let {
      cartId,
      isProductOnCartID,
      quantityShort,
      availableQuantity,
      productId,
    } = data;

    // 1) Restrict quantity wanted only to quantity available

    try {
      let newCart = await this.prisma.cart.update({
        include: { products: true },
        data: {
          update_at: new Date(),
          products: {
            update: {
              where: { id: isProductOnCartID },
              data: { quantityInCart: availableQuantity },
            },
          },
        },
        where: { id: cartId },
      });

      // 2) Recalculate the new price and update it

      await this.updateTotalCart(newCart.id);
    } catch (error) {
      return new Error('Update quantity on cart failed');
    }

    // send error message to warn there is only n quantity available
    var json = [
      {
        error: `only ${availableQuantity} (left) for product ${productId}`,
      },
    ];

    this.sendErrorMessageOnCart(json, cartId);
  }

  async newCart(productId) {
    const isProduct = await this.isProduct(productId);

    if (!isProduct) {
      throw new NotFoundException('No product found');
    } else {
      let newCart: CartDbData = {
        delivery_fees: 0,

        total: 0,
        status: 'PENDING',
      };

      let cartId = await this.prisma.cart.create({
        select: { id: true },
        data: newCart,
      });
      return await this.isCart(cartId.id);
      // let addproductData: addProductDTO = {
      //   productId: productId,
      //   size: size,
      //   quantityWanted: quantity,
      //   cartId: cartId.id,
      // };

      // let addProduct = await this.addProductToCart(addproductData);
      // if (addProduct) {
      //   return await this.isCart(addProduct.id);
      // } else {
      //   throw new NotFoundException('No product added');
      // }
    }
  }

  async deleteErrorMessage(cart) {
    let deleteMessage = await this.prisma.cart.update({
      where: { id: cart.id },
      data: { error_Messages: undefined },
    });
    return deleteMessage;
  }

  async getCart(cart) {
    let cartId = cart.id;
    // check quantity in cart to be sure there is enough available
    await this.checkQuantityInCart(cart);

    // update price related to the new quantities :

    await this.updateTotalCart(cartId);

    const newCart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        products: {
          include: {
            product: {
              select: {
                quantity_available: true,
                price: true,
                DeliveryDate: true,
              },
            },
          },
        },
      },
    });

    return newCart;
  }

  async calculateTotalCart(cartId) {
    const cart = await this.isCart(cartId);

    let total = 0;
    if (cart) {
      cart.products.map((products) => {
        total =
          total +
          Number(products?.product?.price) * Number(products.quantityInCart);
      });
    } else {
      throw new NotFoundException('no cart found');
    }

    return total;
  }

  async updateTotalCart(cartId: string) {
    // 2) Recalculate the new price and update it
    let newTotal = await this.calculateTotalCart(cartId);

    try {
      await this.prisma.cart.update({
        include: { products: true },
        data: {
          update_at: new Date(),

          total: newTotal,
        },
        where: { id: cartId },
      });

      return newTotal;
    } catch (error) {
      console.log('error update Total cart ', error);
    }
  }

  async checkQuantityInCart(cart) {
    // to check if quantities are still available ...
    let cartId = cart.id;
    let ps: any = [];

    cart.products.map(async (products) => {
      ps.push(
        new Promise(async (resolve, reject) => {
          if (products.product) {
            const availableQuantity =
              products.product.quantity_available[products.size];

            // Case 1 there is no product available anymore
            if (availableQuantity === 0) {
              // 2) delete product
              let quantityIncartDATA = {
                productId: products.productId,
                cartId: cartId,
                size: products.size,
              };
              try {
                await this.removeFromCart(quantityIncartDATA);
              } catch (error) {
                reject(error);
              }

              // 3) send error message
              var json = [
                {
                  error: `No quantity left for product ${products.productId}`,
                },
              ];
              try {
                await this.sendErrorMessageOnCart(json, cartId);
              } catch (error) {
                console.log(error);
                reject(error);
              }
              resolve('quantity problems resolved');
            } else {
              // Case 2 there is quantity but less than wanted in cart
              if (
                products.product.quantity_available &&
                products.size &&
                products.product.quantity_available[products.size]
              ) {
                const quantityInCartProduct = products.quantityInCart;
                if (availableQuantity && quantityInCartProduct) {
                  if (availableQuantity < quantityInCartProduct) {
                    const quantityShort =
                      products.quantityInCart - availableQuantity;

                    const isProductOnCartID = products.id;
                    if (products.productId) {
                      let dataQuantityShort = {
                        cartId: cartId,
                        isProductOnCartID: isProductOnCartID,
                        productId: products.productId,
                        availableQuantity: availableQuantity,
                        quantityShort: quantityShort,
                      };

                      try {
                        await this.HandleQuantityShort(dataQuantityShort);
                      } catch (error) {
                        console.log(error);
                        reject(error);
                      }
                    }
                  }
                }
                resolve('quantity problems resolved');
              } else {
                resolve('quantity ok'); // Case 2 : quantity is ok (cf. apres la promesse )
              }
            }
          }
        })
      );
    });

    await Promise.all(ps).then((values) => {
      console.log(values);
    });
  }
  async HandleLastDeliveryDate(CartDelivery, productDelivery) {
    let dateArray = [CartDelivery, productDelivery];
    return dateArray.sort(function (date1, date2) {
      return date2.getTime() - date1.getTime();
    })[0];
  }

  checkQuantityIsEnough(Quantitydatas) {
    let { quantity, quantityWanted, price, totalCart } = Quantitydatas;
    if (quantity <= 0) {
      throw new NotFoundException('Product not available');
    } else {
      let total = Number(totalCart) + quantityWanted * Number(price);

      return total;
    }
  }

  async addProductToCart(addProductData) {
    let { size, productId, product } = addProductData;
    let cartId;

    // quantityWanted is optional, by default =1
    let quantityWanted = 1;

    if (addProductData.quantityWanted) {
      quantityWanted = addProductData.quantityWanted;
    }

    let isCart;
    if (addProductData.cartId) {
      cartId = addProductData.cartId;
      isCart = await this.isCart(cartId);
    }

    // Create new cart if there is none yet
    if (isCart === undefined || cartId === undefined) {
      // throw new NotFoundException('No cart Found');
      isCart = await this.newCart(productId);
      cartId = isCart.id;
      if (!isCart) {
        throw new NotFoundException("Can't create new cart");
      }
    }

    if (product.quantity_available && size) {
      let quantity = product.quantity_available[size];
      let price = product.price;
      let totalCart = isCart.total;
      let Quantitydatas = {
        quantity,
        quantityWanted,
        price,
        totalCart,
      };

      // check if quantity is not null, and recalculate total with new quantity
      let total = await this.checkQuantityIsEnough(Quantitydatas);

      // check if the product to add is already on the cart
      // and if it is the same product size

      let productIncartDATA = {
        productId: productId,
        cartId: cartId,
        size: size,
      }; // check if there is no same product already on cart /
      const isProductOnCartID = await this.isProductOnCart(productIncartDATA);

      let quantityIncartDATA = Object.assign(productIncartDATA, {
        ProductOnCartID: isProductOnCartID,
      });

      if (isProductOnCartID && isProductOnCartID !== null) {
        let allQuantityInCart = await this.QuantityInCartByProduct(
          quantityIncartDATA
        );
        let quantityInCart;
        if (allQuantityInCart) {
          quantityInCart = allQuantityInCart.products[0].quantityInCart;
        }
        //check if there is enough quantity left
        if (
          Number(quantityWanted) + Number(quantityInCart) <=
          Number(quantity)
        ) {
          if (isProductOnCartID && isProductOnCartID.size === size) {
            //update quantity on cart by quantityWanted

            let productUpdated = await this.prisma.cart.update({
              include: { products: true },
              data: {
                update_at: new Date(),
                products: {
                  update: {
                    where: { id: isProductOnCartID.id },
                    data: {
                      quantityInCart: { increment: quantityWanted },
                    },
                  },
                },
                total: total,
              },
              where: { id: cartId },
            });
            let totalUpdated = await this.updateTotalCart(productUpdated.id);
            let ProductWithTotalUpdate = JSON.parse(
              JSON.stringify(productUpdated)
            );

            ProductWithTotalUpdate.total = totalUpdated;

            return ProductWithTotalUpdate;
            // return productUpdated;
          }
        } else {
          // if quantity available < quantity wanted
          const quantityShort =
            quantityWanted + Number(quantityInCart) - quantity;
          let dataQuantityShort = {
            cartId: cartId,
            isProductOnCartID: isProductOnCartID.id,
            productId: productId,
            availableQuantity: quantity,
            quantityShort: quantityShort,
          };
          try {
            await this.HandleQuantityShort(dataQuantityShort);
            let newCart = await this.isCart(cartId);

            return newCart;
          } catch (error) {
            console.log(
              'error on add product Cart, handle quantity short',
              error
            );
          }
        }
      } else {
        // check if there is enough quantity available
        if (quantityWanted <= quantity) {
          let productUpdated = await this.prisma.cart.update({
            include: { products: true },
            data: {
              update_at: new Date(),
              products: {
                create: [
                  {
                    product: { connect: { id: productId } },
                    size: size,
                    quantityInCart: quantityWanted,
                  },
                ],
              },
              total: total,
            },
            where: { id: cartId },
          });

          let totalUpdated = await this.updateTotalCart(productUpdated.id);
          let ProductWithTotalUpdate = JSON.parse(
            JSON.stringify(productUpdated)
          );
          ProductWithTotalUpdate.total = totalUpdated;

          return ProductWithTotalUpdate;
        } else {
          // if, not, put only quantity available, right price and send error message
          let newTotal = await this.updateTotalCart(cartId);

          let productUpdated = await this.prisma.cart.update({
            include: { products: true },
            data: {
              update_at: new Date(),
              products: {
                create: [
                  {
                    product: { connect: { id: productId } },
                    size: size,
                    quantityInCart: quantity,
                  },
                ],
              },
              total: newTotal,
            },
            where: { id: cartId },
          });

          let json = [
            {
              error: `only ${quantity} "left"for product ${productId}`,
            },
          ];
          await this.sendErrorMessageOnCart(json, cartId);

          await this.updateTotalCart(productUpdated.id);

          return productUpdated;
        }
      }
    }
  }

  async removeFromCart(quantityIncartDATA) {
    const { cartId } = quantityIncartDATA;

    let isProductOnCartID;
    let AllSizeOnCart;
    if (quantityIncartDATA.size) {
      isProductOnCartID = await this.isProductOnCart(quantityIncartDATA);
    } else {
      AllSizeOnCart = await this.isProductOnCartAllSize(quantityIncartDATA);
    }

    if (!isProductOnCartID && !AllSizeOnCart) {
      throw new NotFoundException('No product OR Cart found');
    } else {
      // Case1 : Remove all sizes, and the whole product from cart.
      if (!quantityIncartDATA.size) {
        return await this.prisma.productsOnCart.deleteMany({
          where: { cartId: { equals: cartId } },
        });
      } else {
        let quantityIncart = isProductOnCartID.quantityInCart;

        if (
          !quantityIncartDATA.quantity ||
          quantityIncartDATA.quantity >= quantityIncart
        ) {
          // Case 2:remove all quantity for one size'

          let productDeleted = await this.prisma.cart.update({
            where: { id: cartId },
            include: { products: true },
            data: {
              update_at: new Date(),
              products: {
                disconnect: [{ id: isProductOnCartID.id }],
              },
            },
          });
          // 2) delete ProductOnCart
          let ProductOnCartDeleted = await this.prisma.productsOnCart.delete({
            where: { id: isProductOnCartID.id },
          });
          // update Total price
          await this.updateTotalCart(productDeleted.id);
          return productDeleted;
        } else if (quantityIncartDATA.quantity < quantityIncart) {
          // 1) disconnect product from cart
          let newCart = await this.prisma.cart.update({
            where: { id: cartId },
            include: { products: true },
            data: {
              update_at: new Date(),
              products: {
                update: {
                  where: { id: isProductOnCartID.id },
                  data: {
                    quantityInCart: { decrement: quantityIncartDATA.quantity },
                  },
                },
              },
            },
          });
          // update Total price

          await this.updateTotalCart(newCart.id);

          return newCart;
        }
      }
    }
  }

  async findOlderCart(userId) {
    let oldUserCart = await this.prisma.user.findFirst({
      where: {
        AND: [{ id: userId }, { carts: { some: { status: 'PENDING' } } }],
      },
      include: {
        carts: {
          where: { status: { equals: 'PENDING' } },
          include: {
            products: {
              include: { product: { select: { quantity_available: true } } },
            },
          },
        },
      },
    });
    return oldUserCart;
  }

  async addOwnerCart(data) {
    console.log('add owner data cart', data);
    let { user, cart } = data;
    console.log('add owner cart', cart);
    const cartId = cart.id;
    let userId = user.id;

    // check if the user have already a pending Cart

    let oldUserCart = await this.findOlderCart(userId);

    if (!oldUserCart) {
      // if not, add user as owner for the current cart and
      //check if quantities are still available

      await this.checkQuantityInCart(cart);

      let ownerCart = await this.prisma.cart.update({
        where: { id: cartId },
        include: { owner: { select: { id: true, email: true } } },
        data: {
          owner: {
            connect: { id: user.id },
          },
        },
      });
      return ownerCart;
    } else {
      // Merge carts together (keep the oldest one )
      let data = {};

      data = { ...data, update_at: new Date() };

      if (cart.error_Messages) {
        try {
          await this.sendErrorMessageOnCart(
            cart.error_Messages,
            oldUserCart.carts[0].id
          );
        } catch (error) {
          console.log('add to cart message error merge', error);
        }
      }

      if (cart.products) {
        let ps: any = [];

        cart.products.map(async (products) => {
          ps.push(
            new Promise(async (resolve, reject) => {
              let addProductData = {
                productId: products?.productId,
                cartId: oldUserCart?.carts[0].id,
                size: products?.size,
                quantityWanted: products?.quantityInCart,
              };
              try {
                await this.addProductToCart(addProductData);
              } catch (error) {
                console.log('addToCart error', error);
              }

              resolve('product added to older Cart');
            })
          );
        });
        await Promise.all(ps).then((values) => {
          console.log(values);
        });
      }

      try {
        await this.checkQuantityInCart(cart);

        // total recalculate + update
        await this.updateTotalCart(oldUserCart.carts[0].id);
      } catch (error) {
        console.log('error Cart OWNER recalculate price', error);
      }

      // Suppress the other cart
      await this.deleteWholeCart(cart);
      //check if quantities are still available

      try {
        await this.checkQuantityInCart(oldUserCart.carts[0]);
        return await this.isCart(oldUserCart.carts[0].id);
      } catch (error) {
        console.log(
          'error from add Owner, merge two carts, check quantity or calculate price',
          error
        );
      }

      //  oldUserCart.carts[0];
      return cart;
    }
  }

  async deleteWholeCart(cart) {
    console.log('cart  from deletecart', cart.id);
    let deletedCart = await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return deletedCart;
  }

  async deleteAllCarts() {
    let allCarts = await this.prisma.cart.findMany({ select: { id: true } });
    let ids: Array<string> = [];
    allCarts.map((cart) => {
      return ids.push(cart.id);
    });
    let deletedCart = await this.prisma.cart.deleteMany({
      where: { id: { in: ids } },
    });

    return deletedCart;
  }
}
