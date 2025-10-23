import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateTermDto {
  @ApiProperty({ description: 'Programme identifier' })
  @IsUUID()
  programmeId!: string;

  @ApiProperty({ example: 'Y1T1' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Year 1 Term 1' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  order!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
