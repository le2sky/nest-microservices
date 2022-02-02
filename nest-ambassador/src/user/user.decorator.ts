import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserService } from './user.service';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const is_ambassador =
      request.path.toString().indexOf('api/ambassador') >= 0;

    const scope = request.path === is_ambassador ? 'ambassador' : 'admin';

    const userService = new UserService();

    return await userService.get(`user/${scope}`, request.cookies['jwt']);
  },
);
