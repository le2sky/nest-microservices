import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  // 특정 토픽을 구독한다.
  @MessagePattern('email_topic')
  async orderComplated(@Payload() message: KafkaMessage) {
    const order: any = message.value;

    await this.mailerService.sendMail({
      to: 'admin@admin.com',
      subject: 'An order has been completed',
      html: `Order #${order.id} with a total of $${order.total} has been completed!`,
    });

    await this.mailerService.sendMail({
      to: order.ambassador_email,
      subject: 'An order has been completed',
      html: `You earned $${order.ambassador_revenue} from the link #${order.code}`,
    });
  }
}
