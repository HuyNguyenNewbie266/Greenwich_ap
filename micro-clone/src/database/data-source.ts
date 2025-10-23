import 'reflect-metadata';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import { Programme } from '../modules/programme/entities/programme.entity';
import { Term } from '../modules/term/entities/term.entity';
import { User } from '../modules/user/entities/user.entity';
import { InitialMigration1700000000000 } from './migrations/1700000000000-InitialMigration';

ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig, databaseConfig, jwtConfig],
});

const configService = new ConfigService();

export const appDataSource = new DataSource({
  ...(configService.get('database') as Record<string, unknown>),
  entities: [Programme, Term, User],
  migrations: [InitialMigration1700000000000],
});
