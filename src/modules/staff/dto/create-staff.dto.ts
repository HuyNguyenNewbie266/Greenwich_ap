import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ required: false })
  @IsOptional()
  userId?: number;

  @ApiProperty({ required: false, example: 'staff001@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: 'staff123' })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'Luan' })
  @IsString()
  givenName!: string;

  @ApiProperty({ example: 'Lou' })
  @IsString()
  surname!: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  campusId?: number;

  @ApiProperty({ required: false, example: 'FGWS001' })
  @IsOptional()
  @IsString()
  staffCode?: string;

  @ApiProperty({ required: false, example: '2023-09-01' })
  @IsOptional()
  @IsDateString()
  hireDate?: string;

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT'],
    example: 'ACTIVE',
    required: false,
  })
  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT'])
  status?: 'ACTIVE' | 'INACTIVE' | 'SABBATICAL' | 'LEFT';

  @ApiProperty({ required: false, example: 'Staff' })
  @IsOptional()
  @IsString()
  notes?: string;
}
