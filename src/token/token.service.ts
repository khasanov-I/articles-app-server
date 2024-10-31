import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class TokenService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token) {}

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {expiresIn: '30d'})
        
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenRepository.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await this.tokenRepository.create({userId, refreshToken})
        return token
    }
}
