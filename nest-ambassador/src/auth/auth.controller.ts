import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private userService: UserService) {}

  @Post(['admin/register', 'ambassador/register'])
  async register(@Body() body: RegisterDto, @Req() request: Request) {
    return await this.userService.post('register', {
      ...body,
      is_ambassador: request.path === '/api/ambassador/register',
    });
  }

  @Post(['admin/login', 'ambassador/login'])
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const resp = await this.userService.post('login', {
      email,
      password,
      scope: request.path === '/api/admin/login' ? 'admin' : 'ambassador',
    });

    response.cookie('jwt', resp['jwt'], { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Get(['admin/user', 'ambassador/user'])
  async user(@Req() request: Request) {
    return await this.userService.get('user', request.cookies['jwt']);
  }

  @UseGuards(AuthGuard)
  @Post(['admin/logout', 'ambassador/logout'])
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    await this.userService.post('logout', {}, request.cookies['jwt']);
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/info', 'ambassador/users/info'])
  async updateUserInfo(
    @Req() request: Request,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
  ) {
    return await this.userService.put(
      'users/info',
      {
        first_name,
        last_name,
        email,
      },
      request.cookies['jwt'],
    );
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/password', 'ambassador/users/password'])
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }
    return await this.userService.put(
      'users/password',
      {
        password,
        password_confirm,
      },
      request.cookies['jwt'],
    );
  }
}
