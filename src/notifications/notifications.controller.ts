import { Body, Controller, Get, Param, Post, Req, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { type Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {Notification} from './notifications.model'

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationService: NotificationsService,
                private eventEmitter: EventEmitter2
    ) {}

    @ApiOperation({summary: 'Отправление уведомления'})
    @ApiResponse({status: 200, type: Notification})        
    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationService.create(dto)
    }

    @ApiOperation({summary: 'Получение списка уведомлений'})
    @ApiResponse({status: 200, type: [Notification]})    
    @Get('/:userId')
    getNotificationsByUserId(@Param('userId') value: number) {
        return this.notificationService.getNotificationsByUserId(value)
    }

    @ApiOperation({summary: 'Подписка на события о получении уведомлений'})
    @ApiResponse({status: 200, type: Observable<MessageEvent>})    
    @Sse('/connect/subscribe/:id')
    getNewNotification(@Req() req: Request, @Param('id') id: string): Observable<MessageEvent> {
        req.on('close', () => {
            this.eventEmitter.removeAllListeners(`newNotification${id}`)
        })

        return fromEvent(this.eventEmitter, `newNotification${id}`)
            .pipe(map((notification: CreateNotificationDto) => {
                console.log(id)
                return {data: notification} as MessageEvent
            }))
    }

}
