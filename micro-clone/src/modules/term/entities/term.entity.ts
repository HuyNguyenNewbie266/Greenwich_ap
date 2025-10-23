import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Programme } from '../../programme/entities/programme.entity';

@Entity({ name: 'terms' })
@Unique('UQ_terms_programme_code', ['programmeId', 'code'])
export class Term {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'programme_id' })
  programmeId!: string;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column({ name: 'order', default: 1 })
  order!: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate?: string | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Programme, (programme) => programme.terms, { onDelete: 'CASCADE' })
  programme?: Programme;
}
