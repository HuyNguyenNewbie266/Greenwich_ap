import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from './staff.entity';

@Entity({ name: 'staff_role' })
export class StaffRole {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Reference to staff' })
  @Column({ name: 'staff_id', type: 'bigint', unique: true })
  staffId!: number;

  @OneToOne(() => Staff, (staff) => staff.role)
  @JoinColumn({ name: 'staff_id' })
  staff!: Staff;

  @ApiProperty({
    enum: ['TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR'],
  })
  @Column({
    type: 'enum',
    enum: ['TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR'],
  })
  role!: 'TEACHER' | 'ACADEMIC_STAFF' | 'DEPT_HEAD' | 'ADMIN' | 'MENTOR';
}
