import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

export class AdminGUard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    } else return request.user.admin;
  }
}
