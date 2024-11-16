import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor() {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = decodeURI(authHeader.split(' ')[1]).replaceAll('"', '')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = jwt.verify(token, process.env.ACCESS_PRIVATE_KEY)
            req.user = user
            return true
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }
}