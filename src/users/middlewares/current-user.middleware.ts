import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDto;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('from miidleware');
    const { userId } = req.session || {};

    if (userId) {
      const user: User | null = await this.userService.isUserById(userId);

      if (user) {
        req.currentUser = user;
      }
    }
    next();
  }
}
