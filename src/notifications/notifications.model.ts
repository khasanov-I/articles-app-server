import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model";

export type NotificationCreationAttrs = {
    title: string;
    description: string;
    href: string;
    userId: number
}

@Table({tableName: 'notifications'})
export class Notification extends Model<Notification, NotificationCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный id'})   
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Вам пришло уведомление!', description: 'Заголовок'})   
    @Column({type: DataType.STRING})
    title: string;

    @ApiProperty({example: 'Вашу статью оценили!', description: 'Описание'})   
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({example: 'https://website.ru/articles/1', description: 'Ссылка на статью'})   
    @Column({type: DataType.STRING})
    href: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User
}