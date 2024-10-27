import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { ArticleRating } from "src/article_ratings/article_ratings.model";
import { Article } from "src/articles/articles.model";
import { Comment } from "src/comments/comments.model";
import { Notification } from "src/notifications/notifications.model";
import { Profile } from "src/profile/profile.model";

export type roleType = 'ADMIN' | 'USER' | 'MANAGER'

type UserCreationAttrs = {
    username: string,
    password: string,
    avatar: string,
    email: string,
    roles: roleType[]
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING})
    avatar: string;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    roles: roleType[]

    @HasMany(() => Notification)
    notifications: Notification[]

    @HasMany(() => Article)
    articles: Article[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasOne(() => Profile)
    profile: Profile

    @HasMany(() => ArticleRating)
    articleRatings: ArticleRating[]
}