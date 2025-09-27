import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';


export class CreateCampusDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  name!: string;
}
