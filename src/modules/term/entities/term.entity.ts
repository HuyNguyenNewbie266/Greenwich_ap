import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Programme } from '../../programme/entities/programme.entity';
import { Department } from '../../department/entities/department.entity';

@Unique(['programme', 'code'])
@Entity({ name: 'term' })
export class Term {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @ApiProperty({ description: 'Programme identifier', type: Number })
  @Column({ name: 'programme_id', type: 'bigint' })
  programmeId!: number;

  @ApiProperty({ type: () => Programme })
  @ManyToOne(() => Programme, { nullable: false })
  @JoinColumn({ name: 'programme_id' })
  programme!: Programme;

  @ApiProperty()
  @Column({ length: 20 })
  code!: string;

  @ApiProperty()
  @Column({ length: 150 })
  name!: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ name: 'academic_year', length: 20, nullable: true })
  academicYear?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String, format: 'date' })
  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String, format: 'date' })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: string | null;

  @ApiProperty({ type: () => [Department] })
  @ManyToMany(() => Department, { eager: true })
  @JoinTable({
    name: 'term_department',
    joinColumn: { name: 'term_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'department_id', referencedColumnName: 'id' },
  })
  departments!: Department[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
