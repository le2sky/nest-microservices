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
      const user = await this.userService.get('user', request.cookies['jwt']);

      if (!user) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
