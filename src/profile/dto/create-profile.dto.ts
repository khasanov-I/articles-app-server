import { Country, Currency } from "../profile.model";

export class CreateProfileDto {
    readonly avatar: string;
    readonly username: string;
    readonly city: string;
    readonly age: string;
    readonly lastname: string;
    readonly firstname: string;
    readonly userId: number;
}