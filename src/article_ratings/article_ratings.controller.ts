import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleRatingsService } from './article_ratings.service';
import { CreateArticleRatingsDto } from './dto/create-article_ratings.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleRating } from './article_ratings.model';

@Controller('article-ratings')
export class ArticleRatingsController {

    constructor(private articleRatingsService: ArticleRatingsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Добавление оценки для статьи'})
    @ApiResponse({status: 200, type: ArticleRating})
    @Post()
    create(@Body() articleRatingsDto: CreateArticleRatingsDto) {
        return this.articleRatingsService.createArticleRating(articleRatingsDto)
    }

    @ApiOperation({summary: 'Получение оценки'})
    @ApiResponse({status: 200, type: ArticleRating})
    @Get('/:articleId/:userId')
    getAll(@Param('articleId') articleId: number, @Param('userId') userId: number) {
        return this.articleRatingsService.getArticleRating(articleId, userId)
    }

}
