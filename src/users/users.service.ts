import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {

    constructor (@InjectModel(User) private userRepository: typeof User,
                private fileService: FileService,
                private profileService: ProfileService) {}

    async createUserWithAvatar(dto: CreateUserDto, picture) {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const user = await this.userRepository.create({...dto, roles: ['USER'], avatar: picturePath});
        await this.profileService.createProfile({
            avatar: user.avatar,
            age: 20,
            username: user.username,
            city: 'Moscow',
            lastname: 'AAABRRW',
            firstname: 'WBR',
            currency: 'RUB',
            country: 'Russia',
            userId: user.id
        })
        return user;
    }

    async createUserWithoutAvatar(dto: CreateUserDto) {
        const user = await this.userRepository.create({...dto, roles: ['USER']});
        await this.profileService.createProfile({
            avatar: user.avatar,
            age: 20,
            username: user.username,
            city: 'Moscow',
            lastname: 'AAABRRW',
            firstname: 'WBR',
            currency: 'RUB',
            country: 'Russia',
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
