import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('database', (): DataSourceOptions => {
  if (process.env.NODE_ENV === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: ['src/modules/**/*.entity.ts'],
    } as DataSourceOptions;
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5434', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'greenwich_micro',
    synchronize: false,
    migrationsRun: false,
    logging: process.env.NODE_ENV === 'development',
    migrations: ['dist/database/migrations/*.js'],
  } as DataSourceOptions;
});
