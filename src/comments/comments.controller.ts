import { Body, Controller, Get, NotAcceptableException, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentsService.createComment(commentDto)
    }

    @Get('/:articleId')
    getAll(@Param('articleId') id: number) {
        return this.commentsService.getCommentsByArticleId(id)
    }

}
