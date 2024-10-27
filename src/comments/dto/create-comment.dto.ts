export class CreateCommentDto {
    readonly text: string;
    readonly articleId: number;
    readonly userId: number;    
}