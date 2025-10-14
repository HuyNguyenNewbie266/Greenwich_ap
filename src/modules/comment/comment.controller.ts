import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';
import {
  ApiController,
  ApiCreateOperation,
  ApiFindAllOperation,
} from 'src/common/decorators/swagger.decorator';
import { Comment } from './entities/comment.entity';

@Controller('comments')
@ApiController('Comments')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('thread/:threadId')
  @ApiCreateOperation(Comment, 'Create a new comment in a thread')
  @ApiParam({
    name: 'threadId',
    description: 'ID of the thread to comment on',
    type: 'string',
  })
  async createComment(
    @Req() req: AuthenticatedRequest,
    @Param('threadId') threadId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createComment(
      req.user.id,
      Number(threadId),
      dto,
    );
  }

  @Get('thread/:threadId')
  @ApiFindAllOperation(Comment, 'Get all comments for a thread')
  @ApiParam({
    name: 'threadId',
    description: 'ID of the thread containing the comments',
    type: 'string',
  })
  async getThreadComments(@Param('threadId') threadId: string) {
    return this.commentService.findByThread(Number(threadId));
  }
}
