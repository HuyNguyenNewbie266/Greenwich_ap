import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty() @IsInt() departmentId!: number;

  @ApiProperty() @IsString() @MaxLength(20) code!: string;

  @ApiProperty() @IsString() @MaxLength(255) title!: string;

  @ApiProperty({ required: false }) @IsOptional() @IsInt() @Min(0) credits?: number;

  @ApiProperty() @IsString() @MaxLength(20) level!: string;

  @ApiProperty({ required: false }) @IsOptional() @IsInt() teacherId?: number;

  @ApiProperty({ required: false }) @IsOptional() @IsInt() @Min(0) slot?: number;

}
