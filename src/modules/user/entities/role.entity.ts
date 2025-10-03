import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role' })
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty()
  @Column({ length: 150, unique: true })
  name!: string;

  @OneToMany(() => User, (u) => u.role)
  users?: User[];
}
