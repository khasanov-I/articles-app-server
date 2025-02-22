import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { ArticleRating } from "src/article_ratings/article_ratings.model";
import { Article } from "src/articles/articles.model";
import { Comment } from "src/comments/comments.model";
import { Notification } from "src/notifications/notifications.model";
import { Profile } from "src/profile/profile.model";
import { Token } from "src/token/token.model";

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

    @ApiProperty({example: '1', description: 'Уникальный id'})       
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'username', description: 'Имя пользователя'})       
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый ящик'})       
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'geqgqegeqgpo3mp3g3wr', description: 'Зашифрованный пароль'})       
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'avatar.png', description: 'Аватар'})       
    @Column({type: DataType.STRING})
    avatar: string;

    @ApiProperty({example: '[USER]', description: 'Роли'})       
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

    @HasOne(() => Token)
    token: Token
}