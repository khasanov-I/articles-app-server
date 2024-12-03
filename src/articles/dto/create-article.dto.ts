import { ArticleOrder, ArticleSort, ArticleType } from "../articles.model";

export class CreateArticleDto {
    readonly title: string;
    readonly subtitle: string;
    readonly userId: number;
    readonly type: ArticleType[];
    readonly blocks: string;
    readonly authorAvatar: string;
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