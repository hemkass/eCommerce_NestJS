import { SetMetadata } from '@nestjs/common';
import { Product, User } from '@prisma/client';
import { Action } from '../ability.factory';
import { PrismaAbility, Subjects } from '@casl/prisma';

export interface RequiredRule {
  action: Action;
  subject: Subjects<{
    User: Partial<User>;
    Product: Product;
  }>;
}
export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
