import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCourseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
