import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  async order_complated() {
  //   await this.mailerService.sendMail({
  //     to: 'admin@admin.com',
  //     subject: 'An order has been completed',
  //     html: `Order #${order.id} with a total of $${order.total} has been completed!`,
  //   });

  //   await this.mailerService.sendMail({
  //     to: order.ambassador_email,
  //     subject: 'An order has been completed',
  //     html: `You earned $${order.ambassador_revenue} from the link #${order.code}`,
  //   });
  // }
}
