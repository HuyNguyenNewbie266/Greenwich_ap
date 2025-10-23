import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { ProgrammeModule } from './programme/programme.module';
import { TermModule } from './term/term.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProgrammeModule,
    TermModule,
  ],
})
export class AppModule {}
