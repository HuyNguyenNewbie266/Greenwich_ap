import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @SwaggerProperty({
    description: 'User ID cannot be updated',
    readOnly: true,
  })
  userId!: number;

  @SwaggerProperty({
    description: 'Student code cannot be updated',
    readOnly: true,
  })
  studentCode!: string;
}
