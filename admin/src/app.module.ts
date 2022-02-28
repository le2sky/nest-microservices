import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'admin-db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
    LinkModule,
  ],
})
export class AppModule {}
