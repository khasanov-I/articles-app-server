import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Notification } from './notifications.model';

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

    @Sse('/connect/subscribe')
    getNewNotification(): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, 'newNotification')
            .pipe(map((notification: Notification) => {
                return {data: notification} as MessageEvent
            }))
    }
}
