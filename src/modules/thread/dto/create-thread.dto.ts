import {
  IsString,
  MinLength,
  IsArray,
  IsInt,
  IsOptional,
} from 'class-validator';
import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';

export class CreateThreadDto {
  @SwaggerProperty({
    description: 'Title of the thread',
    example: 'Best practices for REST API design',
    required: true,
  })
  @IsString()
  @MinLength(5)
  title: string;

  @SwaggerProperty({
    description: 'Array of user IDs to tag in the thread',
    example: [2, 5],
    required: false,
    isArray: true,
    type: Number,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  taggedUserIds?: number[];
}
