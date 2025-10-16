import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Class } from '../class/entities/class.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class]), UserModule],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService, TypeOrmModule],
})
export class StudentModule {}
