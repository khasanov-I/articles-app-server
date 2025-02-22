import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({example: 'Это комментарий :)', description: 'Текст комментария'})   
    readonly text: string;

    @ApiProperty({example: '1', description: 'id статьи'})   
    readonly articleId: number;

    @ApiProperty({example: '1', description: 'id пользователя, отправившего комментарий'})   
    readonly userId: number;    
}