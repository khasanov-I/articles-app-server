import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { ArticleRating } from "src/article_ratings/article_ratings.model";
import { Comment } from "src/comments/comments.model";
import { User } from "src/users/users.model";
import { ArticleBlockCreationAttrs } from "./dto/create-article.dto";
import { ApiProperty } from "@nestjs/swagger";

export type ArticleOrder = 'asc' | 'desc'

export type ArticleSort = 'views' | 'title' | 'createdAt'

export type ArticleType = 'IT' | 'SCIENCE' | 'ECONOMICS' | 'OTHER' | 'ALL'

type ArticleCreationAttrs = {
    title: string,
    subtitle: string,
    img: string,
    views: number,
    userId: number,
    profileId: number,
    authorAvatar: string,
    authorUsername: string,
    type: ArticleType[],
    blocks: ArticleBlockCreationAttrs[]
}

@Table({tableName: 'articles'})
export class Article extends Model<Article, ArticleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Что используется в микросервисной архитектуре?', description: 'Заголовок'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Kafka, RabbitMq, Redis и не только.', description: 'Подзаголовок'})
    @Column({type: DataType.STRING, allowNull: false})
    subtitle: string;

    @ApiProperty({example: 'image.png', description: 'Изображение'})
    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @ApiProperty({example: '13', description: 'Кол-во просмотров'})
    @Column({type: DataType.INTEGER, allowNull: false})
    views: number;

    @ApiProperty({example: 'IT', description: 'Тэг'})
    @Column({type: DataType.STRING, allowNull: false})
    type: ArticleType

    @ApiProperty({example: `[id: 1, type: "TEXT", title: "Заголовок блока", paragraphs: "Текст блока"]`, description: 'Блоки'})
    @Column({type: DataType.ARRAY(DataType.JSON), allowNull: false})
    blocks: ArticleBlockCreationAttrs[]

    @ApiProperty({example: 'author.png', description: 'Аватар автора'})
    @Column({type: DataType.STRING})
    authorAvatar: string;

    @ApiProperty({example: 'qwerty123', description: 'Имя автора'})
    @Column({type: DataType.STRING, allowNull: false})
    authorUsername: string;

    @ApiProperty({example: '1', description: 'id профиля для перехода на страницу автора'})
    @Column({type: DataType.INTEGER})
    profileId: number

    @HasMany(() => Comment)
    comments: Comment[]
 
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User

    @HasMany(() => ArticleRating)
    articleRatings: ArticleRating[]
}