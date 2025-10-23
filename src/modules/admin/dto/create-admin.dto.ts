import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @SwaggerProperty({
    description: 'Email address',
    example: 'admin@example.com',
  })
  @IsEmail()
  email!: string;

  @SwaggerProperty({
    description: 'Password for admin login (min 6 characters)',
    example: 'SecurePassword123',
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  password!: string;

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
}
