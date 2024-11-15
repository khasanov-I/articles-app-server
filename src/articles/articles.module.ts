import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from './articles.model';
import { ArticleBlock } from 'src/articleblocks/articleblocks.model';
import { Comment } from 'src/comments/comments.model';
import { ArticleRating } from 'src/article_ratings/article_ratings.model';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article, ArticleBlock, Comment, ArticleRating]),
  ]
})
export class ArticlesModule {}
