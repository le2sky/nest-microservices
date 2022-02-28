import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dtos/product-create.dto';
import { AuthGuard } from '../user/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async all() {
    return this.productService.find();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: ProductCreateDto) {
    const product = await this.productService.save(body);
    // this.eventEmitter.emit('product_updated');
    return product;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);

    // this.eventEmitter.emit('product_updated');

    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const response = await this.productService.delete(id);
    // this.eventEmitter.emit('product_updated');
    return response;
  }
}
