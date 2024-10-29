import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Notification } from 'src/notifications/notifications.model';
import { Article } from 'src/articles/articles.model';
import { Profile } from 'src/profile/profile.model';
import { Comment } from 'src/comments/comments.model';
import { ArticleRating } from 'src/article_ratings/article_ratings.model';
import { FileService } from 'src/file/file.service';

@Module({
  providers: [UsersService, FileService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Notification, Article, Comment, Profile, ArticleRating]),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
