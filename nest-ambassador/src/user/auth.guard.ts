import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const is_ambassador =
        request.path.toString().indexOf('api/ambassador') >= 0;

      const scope = request.path === is_ambassador ? 'ambassador' : 'admin';

      const user = await this.userService.get(
        `user/${scope}`,
        request.cookies['jwt'],
      );

      if (!user) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
