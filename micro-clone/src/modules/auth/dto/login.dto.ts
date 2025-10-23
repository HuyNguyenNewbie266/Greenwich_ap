import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@greenwich.edu' })
  @IsString()
  email!: string;

  @ApiProperty({ example: 'ChangeMe123!' })
  @IsString()
  password!: string;
}
