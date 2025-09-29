import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateStudentDto {
  @SwaggerProperty({ description: 'Reference to user account ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @SwaggerProperty({
    description: 'Unique student code',
    example: 'GCS123456',
  })
  @IsNotEmpty()
  @IsString()
  studentCode!: string;

  @SwaggerProperty({
    description: 'Enrolment date',
    required: false,
    example: '2025-09-01',
  })
  @IsOptional()
  @IsDateString()
  enrolmentDay?: string;

  @SwaggerProperty({
    description: 'Mentor ID',
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  mentorId?: number;

  @SwaggerProperty({
    description: 'Class ID',
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  classId?: number;

  @SwaggerProperty({
    description: 'Faculty name',
    example: 'Computing',
  })
  @IsOptional()
  @IsString()
  faculty!: string;

  @SwaggerProperty({
    description: 'Student status',
    enum: ['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED'],
    example: 'ENROLLED',
  })
  @IsOptional()
  @IsEnum(['ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED'])
  status?: 'ENROLLED' | 'SUSPENDED' | 'GRADUATED' | 'DROPPED';

  @SwaggerProperty({
    description: 'Gender',
    enum: ['MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED'],
    example: 'MALE',
  })
  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED'])
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'UNSPECIFIED';

  @SwaggerProperty({
    description: 'Academic year',
    example: '2025-2026',
  })
  @IsString()
  academicYear!: string;
}
