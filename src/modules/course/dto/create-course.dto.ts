import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty() @IsNumber() departmentId!: number;

  @ApiProperty() @IsString() @MaxLength(20)
  code!: string;

  @ApiProperty() @IsString() @MaxLength(255)
  title!: string;

  @ApiProperty({ required: false }) @IsOptional() @IsNumber()
  credits?: number;

  @ApiProperty() @IsString()
  level!: string;

  @ApiProperty({ required: false }) @IsOptional() @IsNumber()
  teacherId?: number;

  @ApiProperty({ required: false }) @IsOptional() @IsNumber()
  slot?: number;
}
