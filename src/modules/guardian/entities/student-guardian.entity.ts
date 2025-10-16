import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../../student/entities/student.entity';
import { Guardian } from './guardian.entity';

@Entity({ name: 'student_guardian' })
@Unique(['studentId', 'guardianId'])
export class StudentGuardian {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Reference to student.id' })
  @Column({ name: 'student_id', type: 'bigint' })
  studentId!: number;

  @ManyToOne(() => Student, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ApiProperty({ description: 'Reference to guardian.id' })
  @Column({ name: 'guardian_id', type: 'bigint' })
  guardianId!: number;

  @ManyToOne(() => Guardian, { nullable: false })
  @JoinColumn({ name: 'guardian_id' })
  guardian!: Guardian;

  @ApiProperty({ enum: ['FATHER', 'MOTHER', 'GUARDIAN', 'RELATIVE', 'OTHER'] })
  @Column({
    type: 'enum',
    enum: ['FATHER', 'MOTHER', 'GUARDIAN', 'RELATIVE', 'OTHER'],
    default: 'GUARDIAN',
  })
  relationship!: 'FATHER' | 'MOTHER' | 'GUARDIAN' | 'RELATIVE' | 'OTHER';

  @ApiProperty()
  @Column({ name: 'is_primary', type: 'boolean', default: false })
  isPrimary!: boolean;
}
