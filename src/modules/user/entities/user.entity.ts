import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';
import { Campus } from './campus.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  UNSPECIFIED = 'UNSPECIFIED',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('user_account')
@Index('email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column({ name: 'role_id', type: 'bigint', unsigned: true })
  @ApiProperty({
    type: Number,
    description: 'Role identifier',
    example: 1,
  })
  roleId: number;

  @Column({ name: 'campus_id', type: 'bigint', unsigned: true, nullable: true })
  @ApiProperty({
    type: Number,
    description: 'Campus identifier',
    example: 1,
  })
  campusId: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({
    type: () => Role,
    description: 'User role',
  })
  role: Role;

  @ManyToOne(() => Campus, (campus) => campus.users, { nullable: true })
  @JoinColumn({ name: 'campus_id' })
  @ApiProperty({
    type: () => Campus,
    description: 'User campus',
  })
  campus: Campus;

  @Column({ type: 'varchar', length: 190, unique: true })
  @ApiProperty({
    type: String,
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  @ApiProperty({
    type: String,
    description: 'User password',
    writeOnly: true,
  })
  password: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @ApiProperty({
    type: String,
    description: 'Primary phone number',
    example: '+84123456789',
  })
  phone: string;

  @Column({ name: 'phone_alt', type: 'varchar', length: 30, nullable: true })
  @ApiProperty({
    type: String,
    description: 'Alternative phone number',
    example: '+84987654321',
  })
  phoneAlt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    type: String,
    description: 'User address',
    example: '123 Main St',
  })
  address: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  @ApiProperty({
    type: String,
    description: 'User surname',
    example: 'Doe',
  })
  surname: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 80, nullable: true })
  @ApiProperty({
    type: String,
    description: 'User middle name',
    example: 'William',
  })
  middleName: string;

  @Column({ name: 'given_name', type: 'varchar', length: 80, nullable: true })
  @ApiProperty({
    type: String,
    description: 'User given name',
    example: 'John',
  })
  givenName: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.UNSPECIFIED,
  })
  @ApiProperty({
    enum: Gender,
    description: 'User gender',
    example: Gender.UNSPECIFIED,
    default: Gender.UNSPECIFIED,
  })
  gender: Gender;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  @ApiProperty({
    type: Date,
    description: 'User date of birth',
    example: '1990-01-01',
  })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiProperty({
    type: String,
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    type: String,
    description: 'Additional notes about user',
    example: 'Some notes about the user',
  })
  note: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  @ApiProperty({
    enum: UserStatus,
    description: 'User account status',
    example: UserStatus.ACTIVE,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

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

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
