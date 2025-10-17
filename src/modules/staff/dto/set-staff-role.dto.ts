import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StaffRole } from '../entities/staff_role.entity';

export class SetStaffRoleDto {
  @ApiProperty({
    description: 'Role assigned to the staff',
    enum: ['TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR'],
    example: 'TEACHER',
  })
  @IsEnum(['TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR'])
  role!: StaffRole['role'];
}
