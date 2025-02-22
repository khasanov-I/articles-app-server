import { ApiProperty } from "@nestjs/swagger";
import { ArticleOrder, ArticleSort, ArticleType } from "../articles.model";

export class CreateArticleDto {
    @ApiProperty({example: 'Это заголовок :)', description: 'Заголовок статьи'})   
    readonly title: string;

    @ApiProperty({example: 'Это подзаголовок :)', description: 'Подзаголовок статьи'})
    readonly subtitle: string;

    @ApiProperty({example: '5', description: 'id автора'})
    readonly userId: number;

    @ApiProperty({example: 'Экономика', description: 'Тэг'})
    readonly type: ArticleType[];

    @ApiProperty({example: '[Тут блоки статьи :)]', description: 'Блоки статьи'})
    readonly blocks: string;

    @ApiProperty({example: 'author.png', description: 'Аватар автора'})
    readonly authorAvatar: string;

    @ApiProperty({example: 'author', description: 'Имя автора'})
    readonly authorUsername: string;
}

export type ArticleBlockCreationAttrs = {
    id: number;
    type: 'IMAGE' | 'CODE' | 'TEXT';
    src?: string;
    code?: string;
    title?: string;
    paragraphs?: string[];
};

export type GetArticlesQueryType = {
    limit: number,
    page: number,
    sort: ArticleSort,
    q: string,
    type: ArticleType,
    order: ArticleOrder
}