import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({
    description: 'User ID cannot be updated',
    readOnly: true,
  })
  userId!: number;

  @ApiProperty({
    description: 'Student code cannot be updated',
    readOnly: true,
  })
  studentCode!: string;
}
