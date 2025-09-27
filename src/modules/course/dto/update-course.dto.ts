import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsEnum, IsOptional } from 'class-validator';

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiPropertyOptional({ enum: CourseStatus, default: CourseStatus.ACTIVE })
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}
