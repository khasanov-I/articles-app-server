import { Module } from '@nestjs/common';
import { ArticleblocksService } from './articleblocks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/articles/articles.model';
import { ArticleBlock } from './articleblocks.model';
import { ArticleblocksController } from './articleblocks.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Article, ArticleBlock]), 
            AuthModule],
  providers: [ArticleblocksService],
  controllers: [ArticleblocksController]
})
export class ArticleblocksModule {}
