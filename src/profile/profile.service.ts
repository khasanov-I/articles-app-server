import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { TokenService } from 'src/token/token.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class ProfileService {

    constructor (@InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create({...dto});
        return profile;
    }

    async getProfileByUserId(id: number) {
        const profile = await this.profileRepository.findOne({where: {userId: id}})
        return profile;
    }
}
