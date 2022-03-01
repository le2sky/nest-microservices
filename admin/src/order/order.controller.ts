import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  all() {
    return this.orderService.find({
      relations: ['order_items'],
    });
  }
}
