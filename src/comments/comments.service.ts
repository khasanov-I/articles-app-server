import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProfileService } from 'src/profile/profile.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CommentsService {

    constructor (@InjectModel(Comment) private commentRepository: typeof Comment,
                private profileService: ProfileService,) {}

    async createComment(dto: CreateCommentDto) {
        const profile = await this.profileService.getProfileByUserId(dto.userId)
        const comment = await this.commentRepository.create({...dto, profileId: profile.id, profileAvatar: profile.avatar, profileUsername: profile.username});
        return comment;
    }

    async getCommentsByArticleId(articleId: number) {
        const comments = await this.commentRepository.findAll({where: {articleId}})
        return comments;
    }

}
