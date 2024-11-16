import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {

    constructor(
       private mailService: MailerService,
        private usersService: UsersService
    ) {}

    async sendMail(mailDto: MailDto, link: string) {
        const usernameCandidate = await this.usersService.getUserByUsername(mailDto.username)
        if (usernameCandidate) {
            throw new HttpException({
                usernameExists: 'Пользователь с таким username уже существует'
            }, HttpStatus.BAD_REQUEST)
        }
        const emailCandidate = await this.usersService.getUserByEmail(mailDto.email)
        if (emailCandidate) {
            throw new HttpException({
                emailExists: 'Пользователь с таким email уже существует'
            }, HttpStatus.BAD_REQUEST)
        }
        await this.mailService.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: mailDto.email,
            subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${process.env.CLIENT_URL}/email_activate/${link}">${link}</a>
                </div>
            `
        })
        return link
    }
}
