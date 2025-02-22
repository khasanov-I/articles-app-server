import { ApiProperty } from "@nestjs/swagger";
import { Country, Currency } from "../profile.model";

export class CreateProfileDto {

    @ApiProperty({example: 'avatar.png', description: 'Аватар профиля'})   
    readonly avatar: string;

    @ApiProperty({example: 'username', description: 'Имя профиля'})   
    readonly username: string;

    @ApiProperty({example: 'Москва', description: 'Город проживания'})   
    readonly city: string;

    @ApiProperty({example: '21', description: 'Возраст'})   
    readonly age: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})   
    readonly lastname: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})   
    readonly firstname: string;

    @ApiProperty({example: '1', description: 'id пользователя'})   
    readonly userId: number;
}