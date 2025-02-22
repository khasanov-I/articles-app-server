import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { Country, Currency } from "src/profile/profile.model";

export class CreateUserDtoWithLink {
    
    @ApiProperty({example: 'username', description: 'Имя пользователя'})       
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly username: string;

    @ApiProperty({example: 'geqgqegeqgpo3mp3g3wr', description: 'Зашифрованный пароль'})       
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
    
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый ящик'})       
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string

    @ApiProperty({example: 'https://website.ru/activate', description: ''})       
    readonly activationLink: string

    @ApiProperty({example: '21', description: 'Возраст'})   
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 2, {message: 'Не меньше 1 и не больше 2 символов'})
    readonly age: string

    @ApiProperty({example: 'Москва', description: 'Город проживания'})   
    @IsString({message: 'Должно быть строкой'})
    readonly city: string

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})   
    @IsString({message: 'Должно быть строкой'})
    readonly lastname: string

    @ApiProperty({example: 'Иван', description: 'Имя'})   
    @IsString({message: 'Должно быть строкой'})
    readonly firstname: string
}

export class CreateUserAndProfileDto {
    @ApiProperty({example: 'username', description: 'Имя пользователя'})       
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly username: string;

    @ApiProperty({example: 'geqgqegeqgpo3mp3g3wr', description: 'Зашифрованный пароль'})       
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
    
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый ящик'})       
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string

    @ApiProperty({example: '21', description: 'Возраст'})   
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 2, {message: 'Не меньше 1 и не больше 2 символов'})
    readonly age: string

    @ApiProperty({example: 'Москва', description: 'Город проживания'})   
    @IsString({message: 'Должно быть строкой'})
    readonly city: string

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})   
    @IsString({message: 'Должно быть строкой'})
    readonly lastname: string

    @ApiProperty({example: 'Иван', description: 'Имя'})   
    @IsString({message: 'Должно быть строкой'})
    readonly firstname: string

}