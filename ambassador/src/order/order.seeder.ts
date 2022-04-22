import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { OrderService } from '../order/order.service';
import { createConnection } from 'typeorm';
import { Order } from './order';
import { Product } from '../product/product';
import { Link } from '../link/link';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  // const orderService = app.get(OrderService);

  // const connection = await createConnection({
  //   name: 'old',
  //   type: 'mysql',
  //   host: 'host.docker.internal',
  //   port: 33066,
  //   username: 'root',
  //   password: 'root',
  //   database: 'ambassador',
  //   entities: [Link, Product, Order, OrderItem],
  // });

  // const orders = await connection.manager.find(Order, {
  //   relations: ['order_items'],
  // });

  // for (let i = 0; i < orders.length; i++) {
  //   await orderService.save(orders[i]);
  // }

  process.exit();
})();
