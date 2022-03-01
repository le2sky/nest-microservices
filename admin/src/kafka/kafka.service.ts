import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(@Inject('KAFKA_SERVICE') private clientKafka: ClientKafka) {}

  async emit(topic: string, key: string, value: any) {
    return this.clientKafka.emit(topic, {
      key,
      value: JSON.stringify(value),
    });
  }
}
