import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService
    ) {}

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async register(userDto: CreateUserDto) {
        const usernameCandidate = await this.usersService.getUserByUsername(userDto.username)
        if (usernameCandidate) {
            throw new HttpException('Пользователь с таким username уже существует', HttpStatus.BAD_REQUEST)
        }
        const emailCandidate = await this.usersService.getUserByEmail(userDto.email)
        if (emailCandidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {username: user.username, id: user.id, roles: user.roles, avatar: user.avatar}
        return {
            token: this.jwtService.sign(payload)
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
