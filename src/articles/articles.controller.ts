import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto, GetArticlesQueryType } from './dto/create-article.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('articles')
export class ArticlesController {
    
    constructor(private articlesService: ArticlesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'img', maxCount: 1 },
        { name: 'files[]' },
      ]))
    create( @UploadedFiles() avatars: { img?: Express.Multer.File[], 'files[]'?: Express.Multer.File[] },
            @Body() articleDto: CreateArticleDto) {
                
        return this.articlesService.createArticle(articleDto, avatars)
    }

    @Get()
    getAll(@Query() query: GetArticlesQueryType) {
        return this.articlesService.getAllArticles(query)
    }

    @Get('/byProfileId/:id')
    getArticlesByProfileId(@Param('id') id: string) {
        return this.articlesService.getAllArticlesByProfileId(id)
    }

    @Get('/:id')
    getArticleById(@Param('id') id: string) {
        return this.articlesService.getArticleById(id)
    }

}
