import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Campus } from './entities/campus.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Campus, Student])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
