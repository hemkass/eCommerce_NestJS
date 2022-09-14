import {
  Controller,
  Get,
  INestApplication,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
// import { describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CartsModule } from './carts.module';

const RETURN_VALUE = 'test';
const SCOPED_VALUE = 'test_scoped';
const WILDCARD_VALUE = 'test_wildcard';

@Controller()
class TestController {
  @Get('test')
  test() {
    return RETURN_VALUE;
  }

  @Get('tests/wildcard_nested')
  wildcard_nested() {
    return RETURN_VALUE;
  }
}

@Module({
  imports: [CartsModule],
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => res.send(WILDCARD_VALUE))
      .forRoutes('tests/*')
      .apply((req, res, next) => res.send(SCOPED_VALUE))
      .forRoutes(TestController)
      .apply((req, res, next) => res.send(RETURN_VALUE))
      .forRoutes('carts');
  }
}

describe('Middleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        imports: [TestModule],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  it(`forRoutes(*)`, () => {
    return request(app.getHttpServer())
      .get('/carts/:cartId')
      .expect(200, RETURN_VALUE);
  });

  //   it(`forRoutes(TestController)`, () => {
  //     return request(app.getHttpServer()).get('/test').expect(200, SCOPED_VALUE);
  //   });

  //   it(`forRoutes(tests/*)`, () => {
  //     return request(app.getHttpServer())
  //       .get('/tests/wildcard')
  //       .expect(200, WILDCARD_VALUE);
  //   });

  afterEach(async () => {
    await app.close();
  });
});
