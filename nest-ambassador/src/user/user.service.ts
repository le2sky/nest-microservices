import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';
import { AbstractService } from '../shared/abstract.service';
import axios, { Method } from 'axios';
@Injectable()
export class UserService extends AbstractService {
  baseUrl = 'http://host.docker.internal:8001/api';

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async request(
    method: Method,
    url: string,
    data: {} = {},
    cookie: string = '',
  ) {
    let headers = {};

    if (cookie != '') {
      headers = {
        Cookie: `jwt=${cookie}`,
      };
    }

    try {
      const response = await axios.request({
        method,
        url,
        baseURL: this.baseUrl,
        headers,
        data,
      });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async post(url: string, data: any, cookie: string = '') {
    return await this.request('post', url, data, cookie);
  }

  async put(url: string, data: any, cookie: string = '') {
    return await this.request('put', url, data, cookie);
  }
  async get(url: string, cookie: string = '') {
    return await this.request('get', url, {}, cookie);
  }
}
