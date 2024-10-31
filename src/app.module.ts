import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Notification } from './notifications/notifications.model';
import { ArticlesModule } from './articles/articles.module';
import { ArticleblocksModule } from './articleblocks/articleblocks.module';
import { Article } from './articles/articles.model';
import { ArticleBlock } from './articleblocks/articleblocks.model';
import { ProfileModule } from './profile/profile.module';
import { CommentsModule } from './comments/comments.module';
import { ArticleRatingsModule } from './article_ratings/article_ratings.module';
import { ArticleRating } from './article_ratings/article_ratings.model';
import { Comment } from './comments/comments.model';
import { Profile } from './profile/profile.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenModule } from './token/token.module';
import * as path from 'path';
import { Token } from './token/token.model';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Article, ArticleBlock, Notification,
        ArticleRating, Comment, Profile, Token
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    NotificationsModule,
    ArticlesModule,
    ArticleblocksModule,
    ProfileModule,
    CommentsModule,
    ArticleRatingsModule,
    FileModule,
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    TokenModule,
    MailModule,
  ],
})
export class AppModule {}
