import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserAndProfileDto} from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Injectable()
export class UsersService {

    constructor (@InjectModel(User) private userRepository: typeof User,
                private fileService: FileService,
                private profileService: ProfileService) {}

    async createUserWithAvatar(userDto: CreateUserAndProfileDto, picture) {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const user = await this.userRepository.create({...userDto, roles: ['USER'], avatar: picturePath});
        await this.profileService.createProfile({
            avatar: user.avatar,
            age: userDto.age,
            username: userDto.username,
            city: userDto.city,
            lastname: userDto.lastname,
            firstname: userDto.firstname,
            currency: userDto.currency,
            country: userDto.country,
            userId: user.id
        })
        return user;
    }

    async createUserWithoutAvatar(userDto: CreateUserAndProfileDto) {
        const user = await this.userRepository.create({...userDto, roles: ['USER']});
        await this.profileService.createProfile({
            avatar: null,
            age: userDto.age,
            username: userDto.username,
            city: userDto.city,
            lastname: userDto.lastname,
            firstname: userDto.firstname,
            currency: userDto.currency,
            country: userDto.country,
            userId: user.id
        })
        return user;
    }

    async deleteUser() {
        return this.userRepository.destroy({where: {email: 'kristiansummer01@gmail.com'}, cascade: true, truncate: true})
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository.findOne({where: {username}, include: {all: true}})
        return user
    }
    
    async getUserByRefreshToken(refreshToken) {
        const user = await this.userRepository.findOne({where: {token: {refreshToken}}})
        return user
    }

}
