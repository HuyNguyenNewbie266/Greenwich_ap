import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGuardianDto {
  @SwaggerProperty({ description: 'Reference to user account ID', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @SwaggerProperty({ description: 'Occupation of guardian', required: false })
  @IsOptional()
  @IsString()
  occupation?: string;

  @SwaggerProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
