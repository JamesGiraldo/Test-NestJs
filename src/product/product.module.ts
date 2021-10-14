import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { ProductEntity } from './product.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ ProductEntity ]) ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
