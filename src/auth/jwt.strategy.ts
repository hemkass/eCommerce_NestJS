import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWTSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    })
  }

  async validate(payload: any) {
    let { email, sub, size, admin, lastname } = payload.data
    return {
      sub: payload.iat,
      email: email,
      id: sub,
      size: size,
      admin: admin,
      lastname: lastname,
    }
  }
}
