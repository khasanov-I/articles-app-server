import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/token/token.model';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TokenModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    forwardRef(() => MailModule)
  ],
  exports: [
    AuthService, JwtModule
  ]
})
export class AuthModule {}
