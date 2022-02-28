import { NestFactory } from '@nestjs/core';
import { Order } from '../order/order';
import { OrderItem } from '../order/order-item';
import { Product } from '../product/product';
import { createConnection } from 'typeorm';
import { AppModule } from '../app.module';
import { Link } from './link';
import { LinkService } from './link.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const linkService = app.get(LinkService);

  const connection = await createConnection({
    name: 'old',
    type: 'mysql',
    host: 'host.docker.internal',
    port: 33066,
    username: 'root',
    password: 'root',
    database: 'ambassador',
    entities: [Link, Product, Order, OrderItem],
  });

  const links = await connection.manager.find(Link, {
    relations: ['products'],
  });

  for (let i = 0; i < links.length; i++) {
    await linkService.save(links[i]);
  }

  process.exit();
})();
