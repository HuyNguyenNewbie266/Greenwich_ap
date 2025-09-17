import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'campus' })
export class Campus {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty()
  @Column({ length: 100, unique: true })
  code!: string;

  @ApiProperty()
  @Column({ length: 150 })
  name!: string;

  @OneToMany(() => User, (u) => u.campus)
  users?: User[];
}
