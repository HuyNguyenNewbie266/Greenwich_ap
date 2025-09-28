import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  name!: string;
}
