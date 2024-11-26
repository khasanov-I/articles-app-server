import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './articles.model';
import { ArticleBlockCreationAttrs, CreateArticleDto } from './dto/create-article.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class ArticlesService {

    constructor (@InjectModel(Article) private articleRepository: typeof Article,
                private fileService: FileService) {}

    async createArticle(dto: CreateArticleDto, avatars: { img?: Express.Multer.File[], 'files[]'?: Express.Multer.File[] }) {

        const {blocks} = dto

        const filenames = []

        for (let i in avatars['files[]']) {
            const file = avatars['files[]'][i]
            const filename = this.fileService.createFile(FileType.IMAGE, file)
            filenames.push(filename)
        }

        const articleBlocks = this.putFilenamesIntoBlocks(JSON.parse(blocks), filenames)

        const articleImg = this.fileService.createFile(FileType.IMAGE, avatars.img[0])        

        const article = await this.articleRepository.create({...dto, blocks: articleBlocks, img: articleImg, views: 0});

        return article;
    }

    async getAllArticles() {
        const articles = await this.articleRepository.findAll()
        return articles;
    }

    putFilenamesIntoBlocks(blocks: ArticleBlockCreationAttrs[], filenames: string[]): ArticleBlockCreationAttrs[] {
        let n = 0

        const result = blocks
        
        for (let i = 0; i < blocks.length; i++) {
            if (result[i].type === 'IMAGE') {
                result[i].src = filenames[n]
                n++
            }
        }
        return result
    }

}
