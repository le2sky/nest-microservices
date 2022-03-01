import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
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
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
