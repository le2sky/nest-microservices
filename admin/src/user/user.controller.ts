import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('ambassadors')
  async ambassadors() {
    const users: User[] = await this.userService.get('users');
    return users.filter((u) => u.is_ambassador);
  }
}
