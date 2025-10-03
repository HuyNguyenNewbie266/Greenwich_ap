import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOwnProfileDto {
  @SwaggerProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @SwaggerProperty({ description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}
