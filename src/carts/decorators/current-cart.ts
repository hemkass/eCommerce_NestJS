import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentCart = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.currentCart
  }
)
