import { ApiProperty } from '@nestjs/swagger';

export class GetStaffRoleResponseDto {
  @ApiProperty({ example: 1, description: 'Staff ID' })
  staffId!: number;

  @ApiProperty({
    example: 'TEACHER',
    description: 'Current role of staff',
    enum: ['TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR'],
  })
  role!: 'TEACHER' | 'ACADEMIC_STAFF' | 'DEPT_HEAD' | 'ADMIN' | 'MENTOR';
}
