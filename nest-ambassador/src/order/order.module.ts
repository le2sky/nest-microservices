import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item';
import { Order } from './order';
import { OrderItemService } from './order-item.service';
import { SharedModule } from '../shared/shared.module';
import { LinkModule } from '../link/link.module';
import { ProductModule } from '../product/product.module';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { OrderListener } from './listeners/order.listener';
import {
  ClientProvider,
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    SharedModule,
    LinkModule,
    ProductModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const options: ClientProvider = {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [configService.get('CONFLUENT_CLUSTER_SERVER')],
                ssl: true,
                sasl: {
                  mechanism: 'plain',
                  username: configService.get('CONFLUENT_API_KEY'),
                  password: configService.get('CONFLUENT_SECRET_KEY'),
                },
              },
            },
          };

          return options;
        },
      },
    ] as ClientsModuleAsyncOptions),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, OrderListener],
})
export class OrderModule {}
