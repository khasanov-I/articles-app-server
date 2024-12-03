import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';
import { Token } from 'src/token/token.model';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SequelizeModule.forFeature([Profile, User]),
            TokenModule],
})
export class ProfileModule {}
