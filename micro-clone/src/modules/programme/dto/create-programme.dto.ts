import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateProgrammeDto {
  @ApiProperty({ example: 'SE' })
  @IsString()
  @Length(2, 10)
  code!: string;

  @ApiProperty({ example: 'Software Engineering' })
  @IsString()
  @Length(3, 100)
  name!: string;

  @ApiProperty({ required: false, example: 'Bachelor programme focused on full-stack engineering.' })
  @IsOptional()
  @IsString()
  description?: string;
}
