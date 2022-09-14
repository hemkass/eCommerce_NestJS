import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { ForbiddenError } from '@casl/ability';

import { FindManyIdsDTO } from './dtos/find-many.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { filtersProductsDTO } from './dtos/filters.dto';
import { Sort } from '../payments/dtos/payment.dto';

import { productCreateExample } from './utils/OpenAPiExamples/productCreateExample';
import { ExistingProduct } from './decorator/current-product.decorator';
import { Product, User } from '@prisma/client';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

import { Request, request } from 'express';
import { CheckAbilities } from '../ability/decorators/ability.decorator';
import { AbilitiesGuard } from '../../guards/role.guard';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private abilityFactory: AbilityFactory
  ) {}

  @ApiBody({
    type: CreateProductDto,
    description:
      "don't forget to add categories, according your path, example possible :",
    examples: productCreateExample,
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProduct(
    @Body() createProductData: CreateProductDto,
    @CurrentUser() user: User,
    @Req() req: Request
  ) {
    if (user) {
      const ability = this.abilityFactory.defineAbility(user);
      const isAllowed = ability.can(Action.Create, 'User');

      if (!isAllowed) {
        throw new ForbiddenException('only admin');
      } else {
        let createdProduct = await this.productService.createProduct(
          createProductData
        );

        return createdProduct;
      }

      // try {
      //   ForbiddenError.from(ability).throwUnlessCan(Action.Create, 'User');
      // } catch (error) {
      //   if (error instanceof ForbiddenError) {
      //     throw new ForbiddenException(error.message, 'admin only');
      //   }
      // }
    }
  }

  @ApiBody({
    type: [String],
    description: 'Categories of product needed,you can add your path',
    examples: {
      categories: {
        value: {
          categories: ['vêtements', 'femme', 'tee-shirt'],
        },
      },
    },
  })
  @ApiQuery({ name: 'Date', type: 'string', enum: Sort, required: false })
  @Post('/allProductsByCategory')
  getAllProductsByCategory(
    @Body() categories: string[],
    @Query() filters: filtersProductsDTO
  ) {
    let datas = { categories, filters };

    return this.productService.getproducts(datas);
  }

  @Get('/:productId')
  getProductById(@Param('productId') id: string) {
    return this.productService.isProduct(id);
  }

  @ApiBody({
    type: CreateProductDto,
    description:
      "send only field to update, for now pictures, color and categories can't be updated",
    examples: {
      quantityavailable: {
        value: {
          productId: '7d09e7a1-cfc3-4458-952b-594396d48758',
          toUpdate: {
            quantity_available: {
              XXS: 20,
            },
          },
        },
      },
      sustainable: {
        value: {
          id: '41942d5f-ae1e-46fb-ba34-97f0edb59c95',
          toUpdate: {
            sustainable: { isActive: true, description: 'description' },
          },
        },
      },
    },
  })
  @Patch()
  async updateProduct(
    @Body() body,

    @ExistingProduct() productToUpdate: Product
  ) {
    const productData = { productToUpdate, toUpdate: body.toUpdate };

    let productUpdated = await this.productService.updateProducts(productData);
    return productUpdated;
  }

  @Delete('/:productId')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: 'User' })
  async deleteProduct(
    @Param('productId') id: string,
    @ExistingProduct() product: Product,
    @Res() response: Response
  ) {
    let productDeleted = await this.productService.deleteProduct(product);
    if (productDeleted) {
      response.status(200).send({
        message: `Your product ${productDeleted.id} been succesfully suppressed`,
      });
    }
  }

  @ApiBody({
    type: FindManyIdsDTO,
    description: 'Delete many product by once, with array of productIDs',
    examples: {
      ProductIdsArray: {
        value: {
          ids: [
            '31c9ed5e-4849-4370-9843-de5251359fab',
            'ec384093-68b6-4bf9-87b4-09976fc1d5e4',
          ],
        },
      },
    },
  })
  @Post('deletemany')
  async deleteManyProducts(
    @Body() body: FindManyIdsDTO,
    @Res() response: Response
  ) {
    let productsDeleted = await this.productService.deleteManyProducts(body);
    if (productsDeleted) {
      response.status(200).json({
        message: `${productsDeleted.count} product(s) have been succesfully suppressed`,
      });
    }
  }
}
