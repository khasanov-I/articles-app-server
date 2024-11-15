import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, Sse, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDtoWithLink } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private eventEmitter: EventEmitter2,
    ) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(userDto, response)
    }

    @Sse('/register/listen')
    listenIfActive(): Observable<string> {
        return fromEvent(this.eventEmitter, 'activateEmail')
            .pipe(map((id: string) => {
                return id
            }))
    }

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'avatar', maxCount: 1
    }]))
    register(@UploadedFiles() file, 
            @Body() userDto: CreateUserDtoWithLink, 
            @Res({ passthrough: true }) response: Response) {
        const {avatar} = file
        this.eventEmitter.removeAllListeners('activateEmail')
        if (!avatar) {
            return this.authService.registerWithoutAvatar(userDto, response)  
        }
        return this.authService.registerWithAvatar(userDto, avatar[0], response)  
    }
    
    @Post('/logout')
    logout(@Req() request: Request,
           @Res({ passthrough: true }) response: Response) {
        const {refreshToken} = request.cookies
        response.clearCookie('refreshToken')
        return this.authService.logout(refreshToken)
    }

    @Get('/refresh')
    refresh(@Req() request: Request,
            @Res({ passthrough: true }) response: Response) {
        const {refreshToken} = request.cookies
        // console.log(request.cookies)
        return this.authService.refresh(refreshToken, response)
    }
}
