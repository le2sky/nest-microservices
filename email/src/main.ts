import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.CONFLUENT_CLUSTER_SERVER],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: process.env.CONFLUENT_API_KEY,
            password: process.env.CONFLUENT_SECRET_KEY,
          },
        },
      },
    },
  );
  app.listen();
}
bootstrap();
