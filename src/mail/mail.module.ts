import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MailService],
  controllers: [MailController],
  imports: [
            forwardRef(() => UsersModule)],
  exports: [MailService]
})
export class MailModule {}
