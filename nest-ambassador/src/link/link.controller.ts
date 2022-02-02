import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Request } from 'express';
import { Link } from './link';
import { Order } from '../order/order';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/user/auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController {
  constructor(
    private linkService: LinkService,
    private userService: UserService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get('admin/users/:id/links')
  async all(@Param('id') id: number) {
    return this.linkService.find({
      user: id,
      relations: ['orders'],
    });
  }

  //   @UseGuards(AuthGuard)
  @Post('ambassador/links')
  async create(@Body('products') products: number[], @Req() request: Request) {
    const user = await this.userService.get('user', request.cookies['jwt']);

    return this.linkService.save({
      code: Math.random().toString(36).substr(6),
      user_id: user['id'],
      products: products.map((id) => ({ id })),
    });
  }

  //   @UseGuards(AuthGuard)
  @Get('ambassador/stats')
  async stats(@Req() request: Request) {
    const user = await this.userService.get('user', request.cookies['jwt']);

    const links: Link[] = await this.linkService.find({
      user_id: user['id'],
      relations: ['orders'],
    });

    return links.map((link) => {
      const completedOrders: Order[] = link.orders.filter((o) => o.complete);

      return {
        code: link.code,
        count: completedOrders.length,
        revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0),
      };
    });
  }

  @Get('checkout/links/:code')
  async link(@Param('code') code: string) {
    return this.linkService.findOne({
      code,
      relations: ['user', 'products'],
    });
  }
}
