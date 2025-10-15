import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ATTENDANCE_STATUS } from '../entities/attendance.entity';

export class CreateAttendanceDto {
  @SwaggerProperty({
    description: 'Student ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  studentId!: number;

  @SwaggerProperty({
    description: 'Class session ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  sessionId!: number;

  @SwaggerProperty({
    description: 'Attendance status',
    enum: ATTENDANCE_STATUS,
    example: 'PRESENT',
  })
  @IsNotEmpty()
  @IsEnum(ATTENDANCE_STATUS)
  status!: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

  @SwaggerProperty({
    description: 'Optional note about the attendance',
    required: false,
    example: 'Student arrived 10 minutes late',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
