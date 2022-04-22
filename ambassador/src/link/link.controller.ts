import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { User } from '../user/user.decorator';
import { Link } from './link';
import { Order } from 'src/order/order';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Post('links')
  async create(@Body('products') products: number[], @User() user) {
    return this.linkService.save({
      code: Math.random().toString(36).substr(6),
      user_id: user['id'],
      products: products.map((id) => ({ id })),
    });
  }

  // @Get('stats')
  // async stats(@User() user) {
  //   const links: Link[] = await this.linkService.find({
  //     user_id: user['id'],
  //     relations: ['orders'],
  //   });

  //   return links.map((link) => {
  //     const completedOrders: Order[] = link.orders.filter((o) => o.complete);

  //     return {
  //       code: link.code,
  //       count: completedOrders.length,
  //       revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0),
  //     };
  //   });
  // }
}
