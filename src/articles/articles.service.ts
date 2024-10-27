import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './articles.model';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {

    constructor (@InjectModel(Article) private articleRepository: typeof Article) {}

    async createArticle(dto: CreateArticleDto) {
        const article = await this.articleRepository.create({...dto});
        return article;
    }

    async getAllArticles() {
        const articles = await this.articleRepository.findAll()
        return articles;
    }

}
