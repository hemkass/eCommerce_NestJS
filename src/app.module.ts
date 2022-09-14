import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CartsModule } from './carts/carts.module';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsService } from './payments/payments.service';
import { CartsService } from './carts/carts.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
import { dateInNmonths } from 'utils/utils';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { DeliveryModule } from './delivery/delivery.module';
import { GoogleStrategy } from './auth/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { DeliveryService } from './delivery/delivery.service';
import { StripeService } from './stripe/stripe.service';
import { StripeModule } from './stripe/stripe.module';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { AbilityModule } from './ability/ability.module';
import { CurrentUserMiddleware } from './users/middlewares/current-user.middleware';
import { AlgoliaModule } from './algolia/algolia.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ReviewsModule,
    CartsModule,

    PaymentsModule,

    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PassportModule.register({
      approval_prompt: 'force',
      access_type: 'offline',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),

    DeliveryModule,

    StripeModule,

    AbilityModule,

    AlgoliaModule,
  ],

  controllers: [AppController, PaymentsController],
  providers: [
    AppService,
    PrismaService,
    PaymentsService,
    CartsService,
    ProductsService,
    UsersService,
    AuthService,

    GoogleStrategy,
    DeliveryService,
    StripeService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },

    JwtService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // let date = dateInNmonths(3)

    consumer
      .apply(
        cookieSession({
          name: 'session',
          keys: ['azerty64'],
          // expires: date,
          maxAge: 24 * 60 * 60 * 1000,
        })
      )

      .forRoutes('*');
  }
}
