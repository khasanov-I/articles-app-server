export class CreateArticleBlockDto {
    readonly type: 'IMAGE' | 'CODE' | 'TEXT'
    readonly src: string;
    readonly title: string;
    readonly code: string;
    readonly paragraphs: string[];
}