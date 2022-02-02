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
import { RedisService } from '../shared/redis.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private redisService: RedisService,
  ) {}

  @Get('admin/ambassadors')
  async ambassadors() {
    const users: User[] = await this.userService.get('users');
    return users.filter((u) => u.is_ambassador);
  }

  @Get('ambassador/rankings')
  async rankings(@Res() response: Response) {
    const client = this.redisService.getClient();

    client.zrevrangebyscore(
      'rankings',
      '+inf',
      '-inf',
      'withscores',
      (err, result) => {
        let score;

        response.send(
          result.reduce((o, r) => {
            if (isNaN(parseInt(r))) {
              return {
                ...o,
                [r]: score,
              };
            } else {
              score = parseInt(r);
              return o;
            }
          }, {}),
        );
      },
    );
  }
}
