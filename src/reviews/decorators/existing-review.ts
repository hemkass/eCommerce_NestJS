import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExistingReview = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.existingReview;
  }
);
