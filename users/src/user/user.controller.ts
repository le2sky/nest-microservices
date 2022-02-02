import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async all() {
    return await this.userService.find();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }
}
