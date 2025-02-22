import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Profile } from './profile.model';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {}

    // @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Получение профиля'})
    @ApiResponse({status: 200, type: Profile})    
    @Get('/:id')
    getProfile(@Param('id') id: number) {
        return this.profileService.getProfileByUserId(id)
    }
}
