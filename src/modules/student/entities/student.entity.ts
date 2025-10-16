import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Class } from '../../class/entities/class.entity';

@Entity({ name: 'student' })
export class Student {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Reference to user account' })
  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId!: number;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Class, (c) => c.students, { nullable: true })
  @JoinColumn({ name: 'class_id' })
  class?: Class;

  @ApiProperty({ description: 'Class (Class reference)', required: false })
  @Column({ name: 'class_id', type: 'bigint', nullable: true })
  classId?: number | null;

  @ApiProperty()
  @Column({ name: 'student_code', type: 'varchar', length: 30, unique: true })
  studentCode!: string;

  @ApiProperty({ description: 'Enrolment Day' })
  @Column({ name: 'enrolment_day', type: 'date', nullable: true })
  enrolmentDay?: Date;

  @ApiProperty({ description: 'Mentor (User reference)', required: false })
  @Column({ name: 'mentor_id', type: 'bigint', nullable: true })
  mentorId?: number | null;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'mentor_id' })
  mentor?: User | null;

  @ApiProperty()
  @Column({ type: 'varchar', length: 150, nullable: true })
  faculty!: string;

  @ApiProperty({
    enum: ['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED', 'OTHER'],
  })
  @Column({
    type: 'enum',
    enum: ['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED', 'OTHER'],
    default: 'ENROLLED',
  })
  status!: 'ENROLLED' | 'SUSPENDED' | 'GRADUATED' | 'DROPPED' | 'OTHER';

  @ApiProperty()
  @Column({
    name: 'academic_year',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  academicYear!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
