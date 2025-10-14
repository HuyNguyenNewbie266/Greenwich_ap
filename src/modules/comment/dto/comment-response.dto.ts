import { Expose, Type, Transform } from 'class-transformer';
import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';

class UserSummaryDto {
  @SwaggerProperty({ description: "The user's unique ID.", example: 123 })
  @Expose()
  id: number;

  @SwaggerProperty({ description: "The user's username.", example: 'jane_doe' })
  @Expose()
  username: string;

  @SwaggerProperty({
    description: "The user's email address.",
    example: 'jane.doe@example.com',
  })
  @Expose()
  email: string;
}

export class CommentResponseDto {
  @SwaggerProperty({ description: 'The unique ID of the comment.', example: 1 })
  @Expose()
  id: number;

  @SwaggerProperty({
    description: 'The content of the comment.',
    example: 'This is a great point!',
  })
  @Expose()
  content: string;

  @SwaggerProperty({
    description: 'The user who created the comment.',
    type: () => UserSummaryDto,
  })
  @Expose()
  @Type(() => UserSummaryDto)
  createdBy: UserSummaryDto;

  @SwaggerProperty({
    description: 'A list of users tagged in the comment.',
    type: () => UserSummaryDto,
    isArray: true,
  })
  @Expose()
  @Type(() => UserSummaryDto)
  taggedUsers: UserSummaryDto[];

  @SwaggerProperty({
    description: 'The ID of the thread this comment belongs to.',
    example: 42,
  })
  @Expose()
  @Transform(({ obj }: { obj: { thread?: { id?: number } } }) => obj.thread?.id)
  threadId: number;

  @SwaggerProperty({
    description: 'The timestamp when the comment was created.',
  })
  @Expose()
  createdAt: Date;

  @SwaggerProperty({
    description: 'The timestamp when the comment was last updated.',
  })
  @Expose()
  updatedAt: Date;
}
