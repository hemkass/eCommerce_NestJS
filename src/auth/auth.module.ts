import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { CartsService } from 'src/carts/carts.service';
import { ProductsService } from 'src/products/products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { StripeService } from 'src/stripe/stripe.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [
    AbilityModule,
    UsersModule,
    PassportModule,
    PassportModule.register({
      approval_prompt: 'force',
      access_type: 'offline',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    JwtStrategy,
    UsersService,
    CartsService,
    ProductsService,
    PrismaService,
    FacebookStrategy,
    StripeService,
    DeliveryService,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    FacebookStrategy,
    LocalStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
