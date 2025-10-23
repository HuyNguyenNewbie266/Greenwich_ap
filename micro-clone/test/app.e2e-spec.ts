process.env.NODE_ENV = 'test';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { hash } from '../src/modules/user/utils/hash';
import { User } from '../src/modules/user/entities/user.entity';

describe('Greenwich micro clone (e2e)', () => {
  let app: any;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.init();

    dataSource = moduleFixture.get(DataSource);
    const userRepo = dataSource.getRepository(User);
    await userRepo.save(
      userRepo.create({
        email: 'admin@greenwich.edu',
        passwordHash: await hash('ChangeMe123!'),
        displayName: 'System Admin',
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('logs in and performs programme/term CRUD', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'admin@greenwich.edu', password: 'ChangeMe123!' })
      .expect(201);

    const token = loginResponse.body.accessToken;

    const programmeResponse = await request(app.getHttpServer())
      .post('/api/v1/programmes')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: 'SE', name: 'Software Engineering' })
      .expect(201);

    const programmeId = programmeResponse.body.id;

    await request(app.getHttpServer())
      .post('/api/v1/terms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        programmeId,
        code: 'Y1T1',
        name: 'Year 1 Term 1',
        order: 1,
      })
      .expect(201);

    const listResponse = await request(app.getHttpServer())
      .get(`/api/v1/terms/programme/${programmeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(listResponse.body.data).toHaveLength(1);
  });
});
