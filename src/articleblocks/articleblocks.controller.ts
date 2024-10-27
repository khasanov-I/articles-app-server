import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleblocksService } from './articleblocks.service';
import { CreateArticleBlockDto } from './dto/create-articleblock.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('articleblocks')
export class ArticleblocksController {

    constructor(private articleBlocksService: ArticleblocksService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() articleBlockDto: CreateArticleBlockDto) {
        return this.articleBlocksService.createArticleBlock(articleBlockDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:articleId')
    getArticleBlocksByArticleId(@Param('articleId') articleId) {
        return this.articleBlocksService.getArticleBlocksByArticleId(articleId)
    }

}
