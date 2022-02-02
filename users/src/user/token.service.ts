import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToken } from './userToken';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async save(options) {
    return await this.userTokenRepository.save(options);
  }

  async findOne(options) {
    return await this.userTokenRepository.findOne(options);
  }

  async delete(options) {
    return this.userTokenRepository.delete(options);
  }
}
