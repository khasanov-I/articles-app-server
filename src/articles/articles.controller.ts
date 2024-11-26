import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from './dto/create-article.dto';

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
    getAll() {
        return this.articlesService.getAllArticles()
    }

}
