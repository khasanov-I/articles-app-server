import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class TokenService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token) {}

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: '15m'})
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

    async findToken(refreshToken) {
        const token = await this.tokenRepository.findOne({where: {refreshToken}})
        return token
    }

    async removeToken(refreshToken) {
        await this.tokenRepository.destroy({where: {refreshToken}})
        return true
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.ACCESS_PRIVATE_KEY)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY)
        } catch (e) {
            return null
        }
    }
}