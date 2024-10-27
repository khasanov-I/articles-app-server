import { Module } from '@nestjs/common';
import { ArticleRatingsController } from './article_ratings.controller';
import { ArticleRatingsService } from './article_ratings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from 'src/articles/articles.model';
import { ArticleRating } from './article_ratings.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArticleRatingsController],
  providers: [ArticleRatingsService],
  imports: [SequelizeModule.forFeature([User, Article, ArticleRating]),
            AuthModule]
})
export class ArticleRatingsModule {}
