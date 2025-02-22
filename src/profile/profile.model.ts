import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { Article } from "src/articles/articles.model";
import { Notification } from "src/notifications/notifications.model";
import { User } from "src/users/users.model";

export type Country = 'Russia' | 'Belarus' | 'Ukraine' | 'Kazahstan' | 'Armenia'

export type Currency = 'RUB' | 'EUR' | 'USD'

type ProfileCreationAttrs = {
    avatar: string,
    username: string,
    city: string,
    age: string,
    lastname: string,
    firstname: string,
    currency: Currency,
    country: Country
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    
    @ApiProperty({example: '1', description: 'Уникальный id'})   
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ApiProperty({example: 'avatar.png', description: 'Аватар профиля'})       
    @Column({type: DataType.STRING})
    avatar: string;

    @ApiProperty({example: 'username', description: 'Имя профиля'})   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @ApiProperty({example: 'Москва', description: 'Город проживания'})   
    @Column({type: DataType.STRING, allowNull: false})
    city: string;

    @ApiProperty({example: '21', description: 'Возраст'})   
    @Column({type: DataType.STRING, allowNull: false})
    age: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})   
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})   
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;
}