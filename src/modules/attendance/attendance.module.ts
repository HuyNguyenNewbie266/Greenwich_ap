import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../student/entities/student.entity';
import { ClassSession } from '../class/entities/class-session.entity';
import { TimeSlot } from '../time-slot/entities/time-slot.entity';
import { Class } from '../class/entities/class.entity';
import { Course } from '../course/entities/course.entity';
import { Room } from '../room/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      Student,
      ClassSession,
      TimeSlot,
      Class,
      Course,
      Room,
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService, TypeOrmModule],
})
export class AttendanceModule {}
