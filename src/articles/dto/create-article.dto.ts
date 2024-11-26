import { ArticleType } from "../articles.model";

export class CreateArticleDto {
    readonly title: string;
    readonly subtitle: string;
    readonly userId: number;
    readonly type: ArticleType[];
    readonly blocks: string;
}

export type ArticleBlockCreationAttrs = {
    id: number;
    type: 'IMAGE' | 'CODE' | 'TEXT';
    src?: string;
    code?: string;
    title?: string;
    paragraphs?: string[];
};