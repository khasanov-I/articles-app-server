import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './articles.model';
import { ArticleBlockCreationAttrs, CreateArticleDto, GetArticlesQueryType } from './dto/create-article.dto';
import { FileService, FileType } from 'src/file/file.service';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';
import { ProfileService } from 'src/profile/profile.service';
import { ArticleType } from './articles.model';

@Injectable()
export class ArticlesService {

    constructor (@InjectModel(Article) private articleRepository: typeof Article,
                private fileService: FileService,
                private profileService: ProfileService) {}

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

        const profile = await this.profileService.getProfileByUserId(dto.userId)

        await this.articleRepository.create({...dto, blocks: articleBlocks, img: articleImg, views: 0, profileId: profile.id});

        return profile.id
    }

    async getAllArticles(query: GetArticlesQueryType) {
        const articles = await this.articleRepository.findAll(
            {
            limit: query.limit,
            order: [[query.sort, query.order]],
            offset: query.page - 1,
            where: (() => {return query.type === 'ALL' ? {
                // title: {[Op.regexp]: query.q},
                [Op.or]: [{title: {[Op.iRegexp]: query.q}}, {subtitle: {[Op.iRegexp]: query.q}}],
            } : {
                [Op.or]: [{title: {[Op.iRegexp]: query.q}}, {subtitle: {[Op.iRegexp]: query.q}}],
                type: query.type
            }
            })()
        }
        )
        
        return articles;
    }

    async getArticleById(id: string) {
        return this.articleRepository.findByPk(id)
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
