import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Article } from "src/articles/articles.model";
import { Notification } from "src/notifications/notifications.model";
import { User } from "src/users/users.model";

type ArticleBlockCreationAttrs = {
    type: 'IMAGE' | 'CODE' | 'TEXT';
    src: string;
    code: string;
    title: string;
    paragraphs: string[];
};

@Table({tableName: 'article_blocks'})
export class ArticleBlock extends Model<ArticleBlock, ArticleBlockCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    type: 'IMAGE' | 'CODE' | 'TEXT';

    @Column({type: DataType.STRING})
    src: string;

    @Column({type: DataType.INTEGER})
    code: string;

    @Column({type: DataType.STRING})
    paragraphs: string;

    @ForeignKey(() => Article)
    @Column({type: DataType.INTEGER})
    articleId: number

    @BelongsTo(() => Article)
    article: Article
}