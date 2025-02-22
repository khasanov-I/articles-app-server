import { Body, Controller, Get, NotAcceptableException, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Comment } from './comments.model';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Создание комментария'})
    @ApiResponse({status: 200, type: Comment})
    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentsService.createComment(commentDto)
    }

    @Get('/:articleId')
    @ApiOperation({summary: 'Получение списка комментариев'})
    @ApiResponse({status: 200, type: [Comment]})
    getAll(@Param('articleId') id: number) {
        return this.commentsService.getCommentsByArticleId(id)
    }

}
