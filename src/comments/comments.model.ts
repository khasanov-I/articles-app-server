import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Article } from "src/articles/articles.model";
import { User } from "src/users/users.model";

type CommentCreationAttrs = {
    text: string,
    articleId: number,
    userId: number,
    profileId: number;
    profileAvatar: string;
    profileUsername: string;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.INTEGER})
    profileId: number;

    @Column({type: DataType.STRING})
    profileAvatar: string;

    @Column({type: DataType.STRING})
    profileUsername: string;

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