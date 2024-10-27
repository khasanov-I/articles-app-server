import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleBlock } from './articleblocks.model';
import { CreateArticleBlockDto } from './dto/create-articleblock.dto';

@Injectable()
export class ArticleblocksService {

    constructor (@InjectModel(ArticleBlock) private articleBlockRepository: typeof ArticleBlock) {}

    async createArticleBlock(dto: CreateArticleBlockDto) {
        const articleBlock = await this.articleBlockRepository.create({...dto});
        return articleBlock;
    }

    async getArticleBlocksByArticleId(articleId: number) {
        const blocks = await this.articleBlockRepository.findAll({where: {articleId}})
        return blocks;
    }
}
