import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Class } from './class.entity';
import { Course } from '../../course/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'class_course' })
export class ClassCourse {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Class, (c) => c.classCourses)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Course, (c) => c.classCourses)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ApiProperty({ required: false, nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  note?: string;
}
