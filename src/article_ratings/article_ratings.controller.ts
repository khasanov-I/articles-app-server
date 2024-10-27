import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleRatingsService } from './article_ratings.service';
import { CreateArticleRatingsDto } from './dto/create-article_ratings.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('article-ratings')
export class ArticleRatingsController {

    constructor(private articleRatingsService: ArticleRatingsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() articleRatingsDto: CreateArticleRatingsDto) {
        return this.articleRatingsService.createArticleRating(articleRatingsDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:articleId/:userId')
    getAll(@Param('articleId') articleId: number, @Param('userId') userId: number) {
        return this.articleRatingsService.getArticleRating(articleId, userId)
    }

}
