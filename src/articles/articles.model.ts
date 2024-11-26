import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { ArticleRating } from "src/article_ratings/article_ratings.model";
import { Comment } from "src/comments/comments.model";
import { User } from "src/users/users.model";
import { ArticleBlockCreationAttrs } from "./dto/create-article.dto";

export type ArticleType = 'ALL' | 'IT' | 'SCIENCE' | 'ECONOMICS'

type ArticleCreationAttrs = {
    title: string,
    subtitle: string,
    img: string,
    views: number,
    userId: number,
    type: ArticleType[],
    blocks: ArticleBlockCreationAttrs[]
}

@Table({tableName: 'articles'})
export class Article extends Model<Article, ArticleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    subtitle: string;

    @Column({type: DataType.STRING})
    img: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    views: number;

    @Column({type: DataType.STRING, allowNull: false})
    type: ArticleType

    @Column({type: DataType.ARRAY(DataType.JSON), allowNull: false})
    blocks: ArticleBlockCreationAttrs[]

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