import { Body, Controller, Post, Res, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TokenService } from 'src/token/token.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private tokenService: TokenService
    ) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(userDto, response)
    }

    @UsePipes(ValidationPipe)
    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'avatar', maxCount: 1
    }]))
    register(@UploadedFiles() file, @Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const {avatar} = file
        return this.authService.register(userDto, avatar[0], response)
    }

}
