import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExistingProduct = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.existingProduct;
  }
);
