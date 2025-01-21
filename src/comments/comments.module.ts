import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from 'src/articles/articles.model';
import { Comment } from './comments.model';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.model';
import { Token } from 'src/token/token.model';
import { TokenService } from 'src/token/token.service';
import { ArticlesService } from 'src/articles/articles.service';
import { FileService } from 'src/file/file.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [CommentsService, ProfileService, ArticlesService, FileService, UsersService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([User, Article, Comment, Profile])]
})
export class CommentsModule {}
