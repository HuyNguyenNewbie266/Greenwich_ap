import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'admin' })
export class Admin {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Reference to user account' })
  @Column({ name: 'user_id', type: 'bigint', unique: true, nullable: false })
  userId!: number;

  @OneToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty({ description: 'Hashed password for admin login' })
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
