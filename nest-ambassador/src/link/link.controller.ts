import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('checkout/links/:code')
  async link(@Param('code') code: string) {
    return this.linkService.findOne({
      code,
      relations: ['user', 'products'],
    });
  }
}
