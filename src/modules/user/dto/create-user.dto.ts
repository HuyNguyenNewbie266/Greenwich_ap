import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @SwaggerProperty({
    description: 'Email address',
    example: 'alice@example.com',
  })
  @IsEmail()
  email!: string;

  @SwaggerProperty({
    description: 'Plain password (will be hashed)',
    required: false,
    writeOnly: true,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @SwaggerProperty({ description: 'Role id (existing role)', example: 2 })
  @IsNumber()
  roleId!: number;

  @SwaggerProperty({ description: 'Campus id', required: false })
  @IsOptional()
  @IsNumber()
  campusId?: number;

  @SwaggerProperty({ description: 'Given name', required: false })
  @IsOptional()
  @IsString()
  givenName?: string;

  @SwaggerProperty({ description: 'Surname', required: false })
  @IsOptional()
  @IsString()
  surname?: string;

  @SwaggerProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @SwaggerProperty({ description: 'Alternative phone', required: false })
  @IsOptional()
  @IsString()
  phoneAlt?: string;

  @SwaggerProperty({ description: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @SwaggerProperty({ description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @SwaggerProperty({ description: 'Note', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @SwaggerProperty({ description: 'Date of birth', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @SwaggerProperty({
    description: 'Gender',
    required: false,
    enum: ['MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED'],
  })
  @IsOptional()
  @IsEnum([
    'MALE' as const,
    'FEMALE' as const,
    'OTHER' as const,
    'UNSPECIFIED' as const,
  ])
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'UNSPECIFIED';

  // --- Fields for Student ---
  @IsOptional()
  @IsString()
  studentCode?: string;

  @IsOptional()
  @IsNumber()
  mentorId?: number;
}
