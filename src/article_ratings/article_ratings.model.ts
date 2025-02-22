import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Article } from "src/articles/articles.model";
import { User } from "src/users/users.model";

type ArticleRatingCreationAttrs = {
    rate: string,
    feedback: string,
    userId: number,
    articleId: number
}

@Table({tableName: 'article-ratings'})
export class ArticleRating extends Model<ArticleRating, ArticleRatingCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '5', description: 'Оценка'})
    @Column({type: DataType.STRING, allowNull: false})
    rate: string;

    @ApiProperty({example: 'Отличная статья!', description: 'Отзыв'})
    @Column({type: DataType.STRING})
    feedback: string;

    @ForeignKey(() => Article)
    @Column({type: DataType.INTEGER})
    articleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => Article)
    article: Article

    @BelongsTo(() => User)
    user: User
}