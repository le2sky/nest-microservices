import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
//import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Req() request: Request) {
    const { password_confirm, ...data } = body;
    if (body.password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('scope') scope: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      scope,
    });

    return {
      jwt,
    };
  }

  //   //@UseGuards(AuthGuard)
  //   @Get(['admin/user', 'ambassador/user'])
  //   async user(@Req() request: Request) {
  //     const cookie = request.cookies['jwt'];

  //     const { id } = await this.jwtService.verifyAsync(cookie);

  //     if (request.path === '/api/admin/user') {
  //       return this.userService.findOne({ id });
  //     }

  //     const user = await this.userService.findOne({
  //       id,
  //       relations: ['orders', 'orders.order_items'],
  //     });

  //     const { orders, password, ...data } = user;

  //     return {
  //       ...data,
  //       revenue: user.revenue,
  //     };
  //   }

  //   //@UseGuards(AuthGuard)
  //   @Post(['admin/logout', 'ambassador/logout'])
  //   async logout(@Res({ passthrough: true }) response: Response) {
  //     response.clearCookie('jwt');

  //     return {
  //       message: 'success',
  //     };
  //   }

  //   //@UseGuards(AuthGuard)
  //   @Put(['admin/users/info', 'ambassador/users/info'])
  //   async updateInfo(
  //     @Req() request: Request,
  //     @Body('first_name') first_name: string,
  //     @Body('last_name') last_name: string,
  //     @Body('email') email: string,
  //   ) {
  //     const cookie = request.cookies['jwt'];

  //     const { id } = await this.jwtService.verifyAsync(cookie);

  //     await this.userService.update(id, {
  //       first_name,
  //       last_name,
  //       email,
  //     });

  //     return this.userService.findOne({ id });
  //   }

  //   //@UseGuards(AuthGuard)
  //   @Put(['admin/users/password', 'ambassador/users/password'])
  //   async updatePassword(
  //     @Req() request: Request,
  //     @Body('password') password: string,
  //     @Body('password_confirm') password_confirm: string,
  //   ) {
  //     if (password !== password_confirm) {
  //       throw new BadRequestException('Passwords do not match!');
  //     }

  //     const cookie = request.cookies['jwt'];

  //     const { id } = await this.jwtService.verifyAsync(cookie);

  //     await this.userService.update(id, {
  //       password: await bcrypt.hash(password, 12),
  //     });

  //     return this.userService.findOne({ id });
  //   }
}
