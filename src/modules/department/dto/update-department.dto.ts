import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';
import { IsEnum, IsOptional } from 'class-validator';

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @ApiPropertyOptional({ enum: DepartmentStatus })
  @IsEnum(DepartmentStatus)
  @IsOptional()
  status?: DepartmentStatus;
}
