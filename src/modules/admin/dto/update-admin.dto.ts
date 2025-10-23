import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateAdminPasswordDto {
  @SwaggerProperty({
    description: 'New password (min 6 characters)',
    example: 'NewSecurePassword123',
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class UpdateAdminDto {
  @SwaggerProperty({
    description: 'New password (min 6 characters)',
    required: false,
    writeOnly: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
