import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    if (profile && profile.name && profile.emails) {
      const { name, emails } = profile;
      console.log('facebook profile', profile);
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,

        accessToken,
      };

      done(null, user);
    }
  }
}
