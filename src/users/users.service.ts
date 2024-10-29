import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class UsersService {

    constructor (@InjectModel(User) private userRepository: typeof User,
                private fileService: FileService) {}

    async createUser(dto: CreateUserDto, picture) {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const user = await this.userRepository.create({...dto, roles: ['USER'], avatar: picturePath});
        return user;
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

}
