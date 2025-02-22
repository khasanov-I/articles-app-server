import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleRatingsDto {
    @ApiProperty({example: '5', description: 'Оценка'})
    rate: string;
    
    @ApiProperty({example: 'Отличная статья!', description: 'Отзыв'})
    feedback: string;
    
    @ApiProperty({example: '1', description: 'id пользователя, оценившего статью'})
    userId: number;

    @ApiProperty({example: '1', description: 'id статьи'})
    articleId: number
}