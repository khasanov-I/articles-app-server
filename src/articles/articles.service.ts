import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './articles.model';
import { ArticleBlockCreationAttrs, CreateArticleDto, GetArticlesQueryType } from './dto/create-article.dto';
import { FileService, FileType } from 'src/file/file.service';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';
import { ProfileService } from 'src/profile/profile.service';
import { ArticleType } from './articles.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ArticlesService {

    constructor (@InjectModel(Article) private articleRepository: typeof Article,
                private fileService: FileService,
                private profileService: ProfileService,
                private usersService: UsersService) {}

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

    async getArticleAuthorId(articleId: number) {
        const article = await this.articleRepository.findOne({where: {id: articleId}})
        const author = await this.usersService.getUserByUsername(article.authorUsername)
        return author.id
    }

    async getAllArticles(query: GetArticlesQueryType) {
        const articles = await this.articleRepository.findAll(
            {
            limit: query.limit,
            order: [[query.sort, query.order], ['createdAt', 'asc']],
            offset: query.page,
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
        articles.map(e => {
            console.log(e.id)
        })
        
        return articles;
    }

    async getAllArticlesByProfileId(id: string) {
        const articles = await this.articleRepository.findAll({
            where: {
                profileId: id
            }
        })
        return articles;
    }


    async getArticleById(id: string) {
        const article = this.articleRepository.findByPk(id)
        this.articleRepository.update({
            views: (await article).views + 1
        }, {
            where: {
                id
            }
        })
        return article
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
