import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class KafkaController {
  @MessagePattern('admin_topic')
  async event(@Payload() message: KafkaMessage) {
    await this[message.key.toString()](message.value);
  }
}
