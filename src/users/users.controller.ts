import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

//
import { Serialize } from '../../interceptors/serialize.interceptors';
import { CartsService } from '../carts/carts.service';

import { AuthService } from '../auth/auth.service';

import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

import { Role, User } from '@prisma/client';
import { Request } from 'express';
import { TokenDto } from './dtos/token.dto';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AbilityFactory } from '../ability/ability.factory';
import { randomRole } from '../../prisma/factories/users-factory';

@ApiTags('users')
@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private abilityFactory: AbilityFactory
  ) {}

  @ApiBody({
    type: CreateUserDto,
    description:
      'only send field to update, all fields can be updated except pictures for now',
    examples: {
      user: {
        value: {
          email: 'nestor@test.fr',
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
          morphology: 'X',
          size: '173cm',
          weight: '58kg',
          role: Role.ADMIN,
        },
      },
    },
  })
  @Post('/signup')
  signUp(@Body() createUserData: CreateUserDto) {
    return this.authService.signUp(createUserData);
  }

  @Post('/randomUser')
  async randomUser() {
    return await this.userService.randomUser();
  }

  @Get('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @ApiBearerAuth()
  @Get('/currentUser')
  @UseGuards(JwtAuthGuard)
  currentUser(@CurrentUser() user: UserDto, @Session() session: any) {
    return user;
  }

  @ApiBearerAuth()
  @ApiBody({
    type: UserDto,
    description:
      'only send field to update, all fields can be updated except pictures for now',
    examples: {
      toUpdate: {
        value: {
          email: 'nestor2@test.fr',
          size: '160cm',
          morphology: 'A',
        },
      },
    },
  })
  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUser(@CurrentUser() user: UserDto, @Body() toUpdate: Partial<UserDto>) {
    return this.userService.updateUser(user, toUpdate);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@CurrentUser() user: UserDto) {
    return this.userService.DeleteUser(user);
  }

  @Delete('/delete/all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }

  @Patch('/role')
  @ApiBody({
    type: Object,

    examples: {
      toUpdate: {
        value: {
          role: Role.PAYMENT,
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateRole(@CurrentUser() user: UserDto, @Body() role: Role) {
    let toUpdate = { user, role };
    console.log('user', user);

    return this.userService.updateRole(toUpdate);
  }
}
