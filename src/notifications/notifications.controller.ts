import { Body, Controller, Get, Param, Post, Req, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { type Request } from 'express';

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationService: NotificationsService,
                private eventEmitter: EventEmitter2
    ) {}

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationService.create(dto)
    }

    @Get('/:userId')
    getNotificationsByUserId(@Param('userId') value: number) {
        return this.notificationService.getNotificationsByUserId(value)
    }

    @Sse('/connect/subscribe/:id')
    getNewNotification(@Req() req: Request, @Param('id') id: string): Observable<MessageEvent> {
        // req.on('close', () => {
        //     console.log('close')
        // })

        return fromEvent(this.eventEmitter, `newNotification${id}`)
            .pipe(map((notification: CreateNotificationDto) => {
                console.log(id)
                return {data: notification} as MessageEvent
            }))
    }

}
