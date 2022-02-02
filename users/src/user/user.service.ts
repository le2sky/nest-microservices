import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(options) {
    return await this.userRepository.save(options);
  }

  async find(options: {} = {}) {
    return await this.userRepository.find();
  }

  async findOne(options) {
    return await this.userRepository.findOne(options);
  }
  async update(id: number, options) {
    return await this.userRepository.update(id, options);
  }
}
