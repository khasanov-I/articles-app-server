import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, CreateUserDtoWithLink } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'src/users/dto/login.dto';
import { TokenService } from 'src/token/token.service';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private tokenService: TokenService,
                private mailService: MailService
    ) {}

    async login(userDto: LoginDto, response: Response) {
        const user = await this.validateUser(userDto)
        const payload = {id: user.id, username: user.username, avatar: user.avatar, roles: user.roles}
        const tokens = this.tokenService.generateTokens(payload)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        response.cookie('refresh', tokens.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})
        return {
            ...tokens
        }
    }

    async register(userDto: CreateUserDtoWithLink, picture, response: Response) {
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto, password: hashPassword}, picture)
        const payload = {id: user.id, username: user.username, avatar: user.avatar, roles: user.roles}
        const tokens = this.tokenService.generateTokens(payload)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        response.cookie('refresh', tokens.refreshToken, {maxAge: 30 * 24* 60 * 60 * 1000, httpOnly: true})
        return {
            ...tokens
        }
    }

    private async validateUser(userDto: LoginDto) {
        const user = await this.usersService.getUserByUsername(userDto.username)
        if (!user) {
            throw new UnauthorizedException({message: 'Некорректный email или пароль'})
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
