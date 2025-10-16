import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guardian } from './entities/guardian.entity';
import { StudentGuardian } from './entities/student-guardian.entity';
import { Student } from '../student/entities/student.entity';
import { User } from '../user/entities/user.entity';
import { GuardianService } from './guardian.service';
import { GuardianController } from './guardian.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guardian, StudentGuardian, Student, User]),
  ],
  providers: [GuardianService],
  controllers: [GuardianController],
  exports: [GuardianService],
})
export class GuardianModule {}
