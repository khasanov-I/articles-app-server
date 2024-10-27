import { ArticleType } from "../articles.model";

export class CreateArticleDto {
    readonly title: string;
    readonly subtitle: string;
    readonly img: string;
    readonly userId: number;
    readonly type: ArticleType[];
}