import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';

describe('Signup (e2e)', () => {
  let app: INestApplication;
  let authJestMock = {};
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(authJestMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST/signup', () => {
    const testemail = 'test@test.fr';
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: testemail, password: 'test' })
      .expect(201)

      .then((res) => {
        const { id, email, morphology, size, admin, token, weight } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testemail);
      });
  });
});
