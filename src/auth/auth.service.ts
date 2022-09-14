import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../users/dtos/create-user.dto';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from '../prisma/prisma.service';
import { googleJWT } from './customType/google_JWT.type';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async signUp(createUserData: CreateUserDto) {
    const { email, firstname, lastname } = createUserData;
    let { password } = createUserData;
    const isUser = await this.usersService.isUserByEmail(email);
    if (isUser) {
      throw new ForbiddenException('email already taken');
    } else {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');

      createUserData.password = result;

      const user = await this.usersService.createUser(createUserData);

      return user;
    }
  }

  async validateUser(email, password) {
    const isUser = await this.usersService.isUserByEmail(email);
    if (!isUser) {
      throw new NotFoundException('incorrect email or password ');
    } else {
      if (isUser && isUser.password) {
        let [salt, storedHash] = isUser.password.split('.');
        const hashToCheck = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash === hashToCheck.toString('hex')) {
          return isUser;
        } else {
          throw new NotFoundException('incorrect email or password');
        }
      }
    }
  }

  async loginGoogle(req) {
    if (!req.user) {
      throw new NotFoundException('No user from google');
    } else {
      return req.user;
    }
  }

  async GoogleToJWT(req) {
    let user = {
      email: req.email,
      firstname: req.firstName,
      lastname: req.lastName,
      admin: req.admin,
      role: req.role,
      token: req.token,
    };

    let newUser: googleJWT;
    const isUser = await this.usersService.isUserByEmail(req.email);

    let payload: any = {};
    if (!isUser) {
      console.log();
      newUser = await this.prismaService.user.create({ data: user });

      payload = {
        email: newUser.email,
        sub: newUser.id,
        lastname: req.lastName,
      };
    }
    if (isUser) {
      payload = {
        email: isUser.email,
        sub: isUser.id,
        admin: isUser.admin,
        lastname: isUser.lastname,
        role: isUser.role,
      };
    }

    // else generate JWT for new User
    console.log('ici', process.env.JWTSecretKey);
    const jwt = await this.jwtService.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 10000 * 60,
        data: payload,
      },
      { secret: process.env.JWTSecretKey }
    );

    req.token = jwt;
    return req;
  }

  async login(user): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id,
      size: user.size,
      admin: user.admin,
      lastname: user.lastname,
      role: user.role,
    };

    return await this.jwtService.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 10000 * 60,
        data: payload,
      },
      { secret: process.env.JWTSecretKey }
    );
  }
}
