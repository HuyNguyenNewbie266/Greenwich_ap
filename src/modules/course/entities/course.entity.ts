import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'course' })
export class Course {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Owning department ID' })
  @Column({ name: 'department_id', type: 'bigint' })
  departmentId!: number;

  @ApiProperty({ description: 'Unique course code' })
  @Column({ length: 20, unique: true })
  code!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @ApiProperty({ required: false })
  @Column({ type: 'integer', nullable: true })
  credits?: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  level!: string;

  @ApiProperty({ required: false })
  @Column({ name: 'teacher_id', type: 'bigint', nullable: true })
  teacherId?: number;

  @ApiProperty({ required: false })
  @Column({ type: 'integer', nullable: true })
  slot?: number;

  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  @Column({ type: 'enum', enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  status!: 'ACTIVE' | 'INACTIVE';

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
