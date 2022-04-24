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

  @Get('stats')
  async stats(@User() user) {
    const links: Link[] = await this.linkService.find({
      user_id: user['id'],
      relations: ['orders'],
    });

    return links.map((link) => ({
      code: link.code,
      count: link.orders.length,
      revenue: link.orders.reduce((s, o) => s + o.total, 0),
    }));
  }
}
