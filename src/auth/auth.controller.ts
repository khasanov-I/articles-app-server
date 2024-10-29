import { Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: LoginDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'avatar', maxCount: 1
    }]))
    register(@UploadedFiles() file, @Body() userDto: CreateUserDto) {
        const {avatar} = file
        return this.authService.register(userDto, avatar[0])
    }

}
