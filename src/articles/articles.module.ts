import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from './articles.model';
import { Comment } from 'src/comments/comments.model';
import { ArticleRating } from 'src/article_ratings/article_ratings.model';
import { FileService } from 'src/file/file.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.model';
import { Token } from 'src/token/token.model';
import { TokenService } from 'src/token/token.service';

@Module({
  providers: [ArticlesService, FileService, ProfileService, TokenService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article, Comment, ArticleRating, Profile, Token]),
  ]
})
export class ArticlesModule {}
