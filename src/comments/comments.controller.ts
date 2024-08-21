import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        cardId: { type: 'number' },
      },
    },
  })
  async create(@Body('content') content: string, @Body('cardId') cardId: number) {
    return this.commentsService.create(content, cardId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}