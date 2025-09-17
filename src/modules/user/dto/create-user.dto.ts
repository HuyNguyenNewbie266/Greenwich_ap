import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import {
  IsEmail,
  IsOptional,
  IsString,
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

  @SwaggerProperty({ description: 'Given name', required: false })
  @IsOptional()
  @IsString()
  givenName?: string;

  @SwaggerProperty({ description: 'Surname', required: false })
  @IsOptional()
  @IsString()
  surname?: string;

  @SwaggerProperty({ description: 'Role id (existing role)', example: 2 })
  @IsNumber()
  roleId!: number;

  @SwaggerProperty({ description: 'Campus id', required: false })
  @IsOptional()
  @IsNumber()
  campusId?: number;

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
