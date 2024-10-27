import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notifications.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    SequelizeModule.forFeature([Notification, User]),
  ]
})
export class NotificationsModule {}
