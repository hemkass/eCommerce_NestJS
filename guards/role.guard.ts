import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../src/ability/ability.factory';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';
import {
  CHECK_ABILITY,
  RequiredRule,
} from '../src/ability/decorators/ability.decorator';
import { Observable } from 'rxjs';
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;
    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message, 'admin only');
      }
      return false;
    }
  }
}
