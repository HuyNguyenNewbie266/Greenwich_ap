import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { StaffRole } from './staff_role.entity';

@Entity({ name: 'staff' })
export class Staff {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Reference to user account' })
  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId!: number;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => StaffRole, (r) => r.staff, { eager: true })
  role?: StaffRole;

  @ApiProperty()
  @Column({ name: 'staff_code', type: 'varchar', length: 30, unique: true })
  staffCode!: string;

  @ApiProperty({ description: 'Hire Date' })
  @Column({ name: 'hire_date', type: 'date', nullable: true })
  hireDate?: Date;

  @ApiProperty({ description: 'End Date' })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT'],
  })
  @Column({
    type: 'enum',
    enum: ['ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT'],
    default: 'ACTIVE',
  })
  status!: 'ACTIVE' | 'INACTIVE' | 'SABBATICAL' | 'LEFT';

  @ApiProperty()
  @Column({
    name: 'notes',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  notes?: string;
}
