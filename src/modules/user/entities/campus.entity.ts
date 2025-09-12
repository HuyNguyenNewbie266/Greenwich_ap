import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('campuses')
export class Campus {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  @ApiProperty({
    type: String,
    description: 'Campus name',
    example: 'Greenwich University London Campus',
  })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @ApiProperty({
    type: String,
    description: 'Campus code',
    example: 'GUL',
  })
  code: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.campus)
  users: User[];
}
