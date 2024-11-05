import { Body, Controller, Get, HttpException, Param, Post, Sse, UsePipes } from '@nestjs/common';
import { MailService } from './mail.service';
import * as uuid from 'uuid'
import { MailDto } from './dto/create-mail.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService,
                private eventEmitter: EventEmitter2
    ) {}

    @Post()
    sendMail(@Body() sendMailDto: MailDto) {
        const link = uuid.v4()
        return this.mailService.sendMail({username: sendMailDto.username, email: sendMailDto.email}, link)
    }

    @Post('/:id')
    activate(@Param('id') activationId: string) {
        return this.eventEmitter.emit('activateEmail', activationId)
    }
}
