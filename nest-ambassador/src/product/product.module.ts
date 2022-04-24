import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product';
import { SharedModule } from '../shared/shared.module';
import { ProductListener } from './listeners/product.listener';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SharedModule, UserModule],
  providers: [ProductService, ProductListener],
  exports: [ProductService],
})
export class ProductModule {}
