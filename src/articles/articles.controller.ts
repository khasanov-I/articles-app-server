import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    
    constructor(private articlesService: ArticlesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() articleDto: CreateArticleDto) {
        return this.articlesService.createArticle(articleDto)
    }

    @Get()
    getAll() {
        return this.articlesService.getAllArticles()
    }

}
