import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { CampusModule } from './modules/campus/campus.module';
import { DepartmentModule } from './modules/department/department.module';
import { ClassModule } from './modules/class/class.module';
import { RoomModule } from './modules/room/room.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    StudentModule,
    CourseModule,
    CampusModule,
    DepartmentModule,
    ClassModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
