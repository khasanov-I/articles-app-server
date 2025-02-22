import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
    @ApiProperty({example: 'Вам пришло уведомление!', description: 'Заголовок'})   
    readonly title: string;

    @ApiProperty({example: 'Вашу статью оценили!', description: 'Описание'})   
    readonly description: string;

    @ApiProperty({example: 'https://website.ru/articles/1', description: 'Ссылка на статью'})   
    readonly href: string;

    @ApiProperty({example: '1', description: 'id получателя'})   
    readonly userId: number
}