import { Country, Currency } from "../profile.model";

export class CreateProfileDto {
    readonly avatar: string;
    readonly username: string;
    readonly city: string;
    readonly age: number;
    readonly lastname: string;
    readonly firstname: string;
    readonly currency: Currency;
    readonly country: Country;
    readonly userId: number;
}