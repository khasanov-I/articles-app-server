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
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    rate: string;

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