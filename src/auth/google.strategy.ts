import { Injectable } from '@nestjs/common'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

import * as passport from 'passport'

import { PassportStrategy } from '@nestjs/passport'
import { domainToASCII } from 'url'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // http://www.passportjs.org/docs/google/
    super({
      approval_prompt: 'force',
      access_type: 'offline',
      clientID: process.env.GOOGLE_AUTH_client_ID,
      clientSecret: process.env.GOOGLE_AUTH_client_secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',

      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }

    done(null, user)
  }
}
