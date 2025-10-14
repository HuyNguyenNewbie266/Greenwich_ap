import {
  IsString,
  IsArray,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';

export class CreateCommentDto {
  @SwaggerProperty({
    description: 'The main content of the comment.',
    example: 'This is a great point, thanks for sharing!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @SwaggerProperty({
    description: 'An array of unique user IDs to tag in the comment.',
    example: [1, 5, 12],
    required: false,
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  taggedUserIds?: number[];
}
