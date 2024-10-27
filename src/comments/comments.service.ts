import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

    constructor (@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async createComment(dto: CreateCommentDto) {
        const comment = await this.commentRepository.create({...dto});
        return comment;
    }

    async getCommentsByArticleId(articleId: number) {
        const comments = await this.commentRepository.findAll({where: {articleId}})
        return comments;
    }

}
