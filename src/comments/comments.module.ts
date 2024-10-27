import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Article } from 'src/articles/articles.model';
import { Comment } from './comments.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([User, Article, Comment]),
            JwtModule]
})
export class CommentsModule {}
