import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { User } from '../user/entities/user.entity';
import { Class } from '../class/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User, Class])],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService, TypeOrmModule],
})
export class StudentModule {}
