import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Reference to user account ID',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({
    description: 'Unique student code',
    required: false,
  })
  @IsString()
  studentCode!: string;

  @ApiProperty({
    description: 'Enrolment Day',
    required: false,
    example: '2025-09-01',
  })
  @IsOptional()
  @IsDateString()
  enrolmentDay?: string;

  @ApiProperty({
    description: 'Mentor ID',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  mentorId?: number;

  @ApiProperty({
    description: 'Class ID',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  classId?: number;

  @ApiProperty({
    description: 'Faculty name',
    example: 'Computing',
    required: false,
  })
  @IsString()
  faculty!: string;

  @ApiProperty({
    description: 'Student status',
    enum: ['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED'],
    example: 'ENROLLED',
    required: false,
  })
  @IsOptional()
  @IsEnum(['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED'])
  status?: 'ENROLLED' | 'SUSPENDED' | 'GRADUATED' | 'DROPPED';

  @ApiProperty({
    description: 'Academic year',
    example: '2025-2026',
  })
  @IsString()
  academicYear!: string;

  // --- New user info if not having userID ---
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  givenName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({
    description: 'Campus ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  campusId?: number;
}
