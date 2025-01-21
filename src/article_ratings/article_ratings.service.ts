import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleRating } from './article_ratings.model';
import { CreateArticleRatingsDto } from './dto/create-article_ratings.dto';

@Injectable()
export class ArticleRatingsService {
    
    constructor (@InjectModel(ArticleRating) private articleRatingRepository: typeof ArticleRating) {}

    async createArticleRating(dto: CreateArticleRatingsDto) {
        const articleRating = await this.articleRatingRepository.create({...dto});
        return articleRating;
    }

    async getArticleRating(articleId: number, userId: number) {
        const articleRating = await this.articleRatingRepository.findOne({where: {articleId, userId}})
        console.log(articleRating)
        return articleRating;
    }

}
