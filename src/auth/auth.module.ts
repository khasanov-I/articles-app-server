import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TokenModule,
    forwardRef(() => UsersModule),
    forwardRef(() => MailModule)
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
