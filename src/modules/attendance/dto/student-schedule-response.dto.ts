import { ApiProperty } from '@nestjs/swagger';

export class StudentScheduleItemDto {
  @ApiProperty({
    description: 'Class name',
    example: 'COS1204',
  })
  class: string;

  @ApiProperty({
    description: 'Course code',
    example: 'COMP1844',
  })
  course: string;

  @ApiProperty({
    description: 'Room name',
    example: 'F212',
  })
  room: string;

  @ApiProperty({
    description: 'Teacher ID (currently not linked to teacher table)',
    example: 1,
  })
  teacher: number;

  @ApiProperty({
    description: 'Attendance status',
    example: 'PRESENT',
    enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'NOT_RECORDED'],
  })
  status: string;

  @ApiProperty({
    description: 'Day of week (0-6, 0 = Sunday, 6 = Saturday)',
    example: 1,
    minimum: 0,
    maximum: 6,
  })
  day: number;

  @ApiProperty({
    description: 'Time slot ID',
    example: 1,
  })
  slot: number;

  @ApiProperty({
    description: 'Session date (YYYY-MM-DD)',
    example: '2025-10-15',
  })
  date: string;

  @ApiProperty({
    description: 'Session ID',
    example: 1,
  })
  sessionId: number;

  @ApiProperty({
    description: 'Class ID',
    example: 1,
  })
  classId: number;

  @ApiProperty({
    description: 'Course ID',
    example: 1,
  })
  courseId: number;

  @ApiProperty({
    description: 'Room ID',
    example: 1,
  })
  roomId: number;

  @ApiProperty({
    description: 'Time slot name',
    example: 'Slot 1',
  })
  slotName: string;

  @ApiProperty({
    description: 'Time slot start time',
    example: '07:30:00',
  })
  slotStartTime: string;

  @ApiProperty({
    description: 'Time slot end time',
    example: '09:00:00',
  })
  slotEndTime: string;
}

export class StudentScheduleResponseDto {
  @ApiProperty({
    description: 'Student ID',
    example: 1,
  })
  studentId: number;

  @ApiProperty({
    description: 'Start date',
    example: '2025-10-01',
  })
  startDate: string;

  @ApiProperty({
    description: 'End date',
    example: '2025-10-31',
  })
  endDate: string;

  @ApiProperty({
    description: 'Array of schedule items',
    type: [StudentScheduleItemDto],
  })
  schedule: StudentScheduleItemDto[];
}
