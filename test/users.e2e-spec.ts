import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('Creating New Users POST /api/users/create', () => {
    const CREATE_USER_URL = '/api/users/create';
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'alex',
          password: 'password123456',
          email: 'alex@example.com',
        })
        .expect(201);
    });

    it('should return a 400 when invalid username is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'al',
          password: 'password123456',
          email: 'alex@example.com',
        })
        .expect(400);
    });

    it('should return a 400 when invalid password is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'alex',
          password: '124',
          email: 'alex@example.com',
        })
        .expect(400);
    });
    it('should return a 400 when invalid email is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'alex',
          password: '124alexpassword',
          email: 'example.com',
        })
        .expect(400);
    });
  });
});
