import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link';
import { Order } from '../order/order';
import { AuthGuard } from 'src/user/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController {
  constructor(private linkService: LinkService) {}

  @UseGuards(AuthGuard)
  @Get('admin/users/:id/links')
  async all(@Param('id') id: number) {
    return this.linkService.find({
      user: id,
      relations: ['orders'],
    });
  }

  @Post('ambassador/links')
  async create(@Body('products') products: number[], @User() user) {
    return this.linkService.save({
      code: Math.random().toString(36).substr(6),
      user_id: user['id'],
      products: products.map((id) => ({ id })),
    });
  }

  @Get('ambassador/stats')
  async stats(@User() user) {
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
