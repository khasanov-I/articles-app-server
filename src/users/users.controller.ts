import { Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'picture', maxCount: 1
    }]))
    create(@UploadedFiles() files, @Body() userDto: CreateUserDto) {
        const {picture} = files
        return this.usersService.createUser(userDto, picture)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }
}
