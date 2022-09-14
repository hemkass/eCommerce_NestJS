import { Injectable } from '@nestjs/common';
import { AbilityClass, AbilityBuilder, subject } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { User, Prisma, Product, Payment } from '@prisma/client';
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'Delete',
}

export type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: Partial<User>;
      Product: Product;
      Payment: Payment;
    }>
  ]
>;
const AppAbility = PrismaAbility as AbilityClass<AppAbility>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(AppAbility);
    // const AppAbility = PrismaAbility as AbilityClass<AppAbility>;

    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all');
    } else if (user.role === 'PAYMENT') {
      can(Action.Manage, 'Payment');
    } else {
      cannot(Action.Read, 'Payment');
      can(Action.Read, 'Product');
    }

    return build();
    // ability.can('read', 'Product');
  }
}
