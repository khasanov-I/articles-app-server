import { Injectable } from '@nestjs/common';
import { Notification } from './notifications.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {

    constructor (@InjectModel(Notification) 
                    private notificationRepository: typeof Notification,
                    private eventEmitter: EventEmitter2       
                ) {}

    async create(dto: CreateNotificationDto) {
        const notification = await this.notificationRepository.create({...dto})
        this.eventEmitter.emit('newNotification', notification)
        return notification
    }

    async getNotificationsByUserId(userId: number) {
        const notifications = await this.notificationRepository.findAll({where: {userId}})
        return notifications
    }

}
