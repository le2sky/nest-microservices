import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from '../app.module';
import { Product } from './product';
import { ProductService } from './product.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductService);

  const connection = await createConnection({
    name: 'old',
    type: 'mysql',
    host: 'host.docker.internal',
    port: 33066,
    username: 'root',
    password: 'root',
    database: 'ambassador',
    entities: [Product],
  });

  const products = await connection.manager.find(Product);

  for (let i = 0; i < products.length; i++) {
    await productService.save(products[i]);
  }

  process.exit();
})();
