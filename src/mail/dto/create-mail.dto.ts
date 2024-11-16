import { IsEmail, IsString, Length } from "class-validator"

export class MailDto {
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string
    
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly username: string

    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(1, 2, {message: 'Не меньше 1 и не больше 2 символов'})
    readonly age: string

    @IsString({message: 'Должно быть строкой'})
    readonly city: string

    @IsString({message: 'Должно быть строкой'})
    readonly lastname: string

    @IsString({message: 'Должно быть строкой'})
    readonly firstname: string

    @IsString({message: 'Должно быть строкой'})
    readonly currency: string
    
    @IsString({message: 'Должно быть строкой'})
    readonly country: string
}