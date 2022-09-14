import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UpdateOptions } from './customTypes/updateFnOptions';

import { FindManyIdsDTO } from './dtos/find-many.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async sizeProductConstructor(quantity_available) {
    let quantityObject = {
      XXS: 0,
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    };
    let quantity = Object.assign(quantityObject, quantity_available);

    return quantity;
  }

  async CreateSustainableDB(data, newProduct) {
    const ProductSustainable = await this.prisma.sustainable.create({
      data: data,
    });

    let sustainable = {
      sustainable: {
        connect: { id: ProductSustainable.id },
      },
    };
    newProduct = await Object.assign(newProduct, sustainable);

    return newProduct;
  }

  async createProductObject(createProductData) {
    let {
      categories,
      ref,
      title,
      description,
      brand,
      DeliveryDate,
      price,
      color,
      size,
      quantity_available,
    } = createProductData;

    let keys = Object.keys(createProductData);

    let style = '';

    let picturesArr: any = [];

    let newProduct = {
      title: title,
      ref: ref,
      color: color,
      description: description,
      brand: brand,
      categories: categories,
      price: price,
      size: size,
      quantity_available: {
        create: quantity_available,
      },
      pictures: { createMany: { data: picturesArr } },
    };

    let ps: any = [];

    keys.map((key) => {
      ps.push(
        new Promise(async (resolve, reject) => {
          switch (key) {
            case 'quantity_available':
              quantity_available = await this.sizeProductConstructor(
                quantity_available
              );
              break;
            case 'style':
              style = style;
              break;

            case 'pictures':
              picturesArr = [...createProductData.pictures];
              newProduct.pictures = {
                createMany: {
                  data: picturesArr,
                },
              };
              break;

            case 'sustainable':
              newProduct = await this.CreateSustainableDB(
                createProductData.sustainable,
                newProduct
              );
              break;
            default:
              break;
          }
          resolve('switch resolved');
        })
      );
    });
    await Promise.all(ps).then((values) => {
      console.log(values);
    });

    return newProduct;
  }

  async createProduct(createProductData) {
    const newProduct = await this.createProductObject(createProductData);

    const product = await this.prisma.product.create({
      include: { sustainable: true, quantity_available: true, pictures: true },
      data: newProduct,
    });

    return product;
  }

  async createOrderByObject(filters) {
    let orderBy;

    const keys = Object.keys(filters);

    let ps: any = [];
    orderBy = { created_at: `desc` };
    keys.map((key) => {
      ps.push(
        new Promise(async (resolve, reject) => {
          switch (key) {
            case 'sortDate':
              if (filters.sortDate === 'asc') {
                orderBy = { created_at: `asc` };
              }
              break;

            case 'priceSort':
              if (filters.priceSort === 'desc') {
                orderBy = { price: 'desc' };
              } else {
                orderBy = { price: 'asc' };
              }
              break;

            case 'popularity':
              if (filters.popularity === 'asc') {
                orderBy = { rating_avg: 'asc' };
              } else {
                orderBy = { rating_avg: 'desc' };
              }
              break;

            default:
              break;
          }
          resolve('switch resolved');
        })
      );
    });
    await Promise.all(ps).then((values) => {
      console.log(values);
    });

    return orderBy;
  }

  async getproducts(datas) {
    let { categories, filters } = datas;
    let orderBy = await this.createOrderByObject(filters);

    let take = 12;
    let skip = 0;
    if (filters.skip) {
      skip = filters.skip;
    }

    if (filters.take) {
      take = filters.take;
    }

    const search = await this.prisma.product.findMany({
      where: { categories: { hasEvery: categories.categories } },
      orderBy: orderBy,
      take: take,
      skip: skip,
    });

    const count = await this.prisma.product.aggregate({
      where: { categories: { hasEvery: categories.categories } },
      orderBy: orderBy,
      _count: true,
    });

    return { count: count, products: search };
  }

  async isProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      include: { sustainable: true, quantity_available: true, pictures: true },
    });
    return product;
  }

  async isManyProduct(body: FindManyIdsDTO) {
    let arr = body.ids;
    const product = await this.prisma.product.findMany({
      where: {
        id: { in: arr },
      },
    });

    return product;
  }

  async createUpdateObject(toUpdate, options?: UpdateOptions) {
    let data = {};
    data = { ...data, update_at: new Date() };

    let keys = Object.keys(toUpdate);
    const ps: any = [];
    keys.map((key) => {
      ps.push(
        new Promise(async (resolve, reject) => {
          switch (key) {
            case 'title':
              data = { ...data, title: toUpdate.title };
              break;
            case 'ref':
              data = { ...data, ref: toUpdate.ref };
              break;

            case 'brand':
              data = { ...data, brand: toUpdate.brand };
              break;

            case 'description':
              data = { ...data, description: toUpdate.description };

              break;
            case 'ref':
              data = { ...data, ref: toUpdate.ref };
              break;

            case 'price':
              data = { ...data, price: toUpdate.price };
              break;

            case 'DeliveryDate':
              data = {
                ...data,
                DeliveryDate: new Date(toUpdate.DeliveryDate),
              };

              break;

            case 'size':
              data = { ...data, size: toUpdate.size };

              break;

            case 'sustainable':
              if (
                toUpdate?.sustainable &&
                typeof toUpdate?.sustainable?.isActive !== 'boolean'
              ) {
                reject(new ForbiddenException('isActive property is missing'));
              }
              if (
                toUpdate?.sustainable &&
                toUpdate?.sustainable?.isActive === false &&
                toUpdate?.sustainable?.description &&
                toUpdate?.sustainable.description.trim().length > 0
              ) {
                reject(new ForbiddenException('No description accepted'));
              }

              let sustainableActive = Boolean(toUpdate.sustainable.isActive);

              if (sustainableActive === false) {
                data = {
                  ...data,
                  sustainable: {
                    update: { isActive: sustainableActive, description: '' },
                  },
                };
              } else {
                data = {
                  ...data,
                  sustainable: {
                    update: {
                      isActive: sustainableActive,
                      description: toUpdate.sustainable.description,
                    },
                  },
                };
                resolve('quantity ok');
                break;
              }

              break;

            case 'quantity_available':
              if (options?.formerQuantity) {
                let formerQuantity = { ...options.formerQuantity };

                let quantityUpdated = Object.assign(
                  formerQuantity,
                  toUpdate.quantity_available
                );

                let { XXS, XS, S, M, L, XL, XXL, XXXL } = quantityUpdated;

                data = {
                  ...data,

                  quantity_available: {
                    update: {
                      XXS: XXS,
                      XS: XS,
                      S: S,
                      M: M,
                      L: L,
                      XL: XL,
                      XXL: XXL,
                      XXXL: XXXL,
                    },
                  },
                };
                resolve('promise resolved');
                break;
              } else {
                reject(
                  new ForbiddenException(
                    'with former quantity available, please check your product'
                  )
                );
              }

              break;

            default:
              break;
          }
          resolve('switch resolved');
        })
      );
    });
    await Promise.all(ps).then((values) => {
      console.log(values);
    });

    return data;
  }

  async updateProducts(dataProduct) {
    const { productToUpdate, toUpdate } = dataProduct;

    let id = productToUpdate.id;

    let data;

    if (toUpdate?.quantity_available || toUpdate?.sustainable) {
      if (productToUpdate.quantity_available && toUpdate?.quantity_available) {
        let formerQuantity = productToUpdate.quantity_available;

        data = await this.createUpdateObject(toUpdate, {
          formerQuantity: formerQuantity,
        });
      } else {
        data = await this.createUpdateObject(toUpdate);
      }
    } else {
      data = await this.createUpdateObject(toUpdate);
    }

    let productUpdated = await this.prisma.product.update({
      where: {
        id: id,
      },
      include: {
        quantity_available: true,
        sustainable: true,
        pictures: true,
      },
      data: data,
    });

    return productUpdated;
  }

  async deleteProduct(product) {
    return this.prisma.product.delete({ where: { id: product.id } });
  }

  async deleteManyProducts(body: FindManyIdsDTO) {
    const ProductsToDelete = this.isManyProduct(body);
    if (!ProductsToDelete) {
      throw new NotFoundException('One or more  product(s) not found');
    } else {
      return await this.prisma.product.deleteMany({
        where: { id: { in: body.ids } },
      });
    }
  }

  async deleteAllProducts() {
    let allProducts = await this.prisma.product.findMany({
      select: { id: true },
    });
    let ids: Array<string> = [];
    allProducts.map((product) => {
      return ids.push(product.id);
    });
    return await this.prisma.product.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
