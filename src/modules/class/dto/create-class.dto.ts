import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    enum: ['PLANNING', 'RUNNING', 'CLOSED', 'CANCELLED'],
    default: 'PLANNING',
    required: false,
  })
  @IsEnum(['PLANNING', 'RUNNING', 'CLOSED', 'CANCELLED'])
  @IsOptional()
  status?: 'PLANNING' | 'RUNNING' | 'CLOSED' | 'CANCELLED';
}
