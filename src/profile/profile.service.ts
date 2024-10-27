import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {

    constructor (@InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create({...dto});
        return profile;
    }

    async getProfileById(id: number) {
        const profile = await this.profileRepository.findByPk(id)
        return profile;
    }

}
