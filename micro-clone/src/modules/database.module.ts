import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Programme } from './programme/entities/programme.entity';
import { Term } from './term/entities/term.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          ...configService.get<TypeOrmModuleOptions>('database'),
          entities: [Programme, Term, User],
        }) as TypeOrmModuleOptions,
    }),
  ],
})
export class DatabaseModule {}
