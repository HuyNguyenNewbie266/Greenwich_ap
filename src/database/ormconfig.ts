import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

let config: DataSourceOptions;

if (isProduction) {
  config = {
    type: 'postgres',
    url: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
  };
} else {
  config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    synchronize: false,
  };
}

export const AppDataSource = new DataSource(config);
