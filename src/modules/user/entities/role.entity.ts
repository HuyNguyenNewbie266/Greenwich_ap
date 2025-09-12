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

export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  ACADEMIC_STAFF = 'ACADEMIC_STAFF',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({
    type: String,
    description: 'Role name',
    example: 'Student',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    unique: true,
  })
  @ApiProperty({
    enum: RoleType,
    description: 'Role type',
    example: RoleType.STUDENT,
  })
  type: RoleType;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    description: 'Role permissions',
    example: {
      canCreate: false,
      canRead: true,
      canUpdate: false,
      canDelete: false,
    },
  })
  permissions: Record<string, any>;

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

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
