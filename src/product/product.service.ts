import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';

import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';

import { HTTP_MESSAGE } from './../config/constants';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: ProductRepository,
    ) { }

    async getAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();
        if (!products.length) throw new NotFoundException( HTTP_MESSAGE.NO_DATA );
        return products;
    }

    async findById(id: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne(id);
        if (!product) throw new NotFoundException( HTTP_MESSAGE.ID_NOT_FOUND );
        return product;
    }

    async findByName(termino: string): Promise<ProductEntity[]> {
        const product = await this.productRepository.find({ where: { name: Like(`%${ termino }%`) } });
        if (!product) throw new NotFoundException( HTTP_MESSAGE.NO_RESULT );
        return product;
    }

    async create(product: ProductDto): Promise<any> {
        const newProduct = await this.productRepository.create(product);
        await this.productRepository.save(newProduct);
        return HTTP_MESSAGE.CREATED;
    }

    async update(id: number, product: ProductDto): Promise<any> {
        const productId = await this.findById(id);
        if (!productId) throw new NotFoundException( HTTP_MESSAGE.ID_NOT_FOUND );
        const updatedProduct = await this.productRepository.update(productId, product);
        if (!updatedProduct) throw new NotFoundException( HTTP_MESSAGE.NO_RESULT );
        return product;
    }

    async delete(id: number): Promise<any> {
        const productId = await this.findById(id);
        if (!productId) throw new NotFoundException( HTTP_MESSAGE.ID_NOT_FOUND );
        const deletedProduct = await this.productRepository.delete(productId);
        if (!deletedProduct) throw new NotFoundException( HTTP_MESSAGE.NO_RESULT );
        return HTTP_MESSAGE.DELETED;
    }


}
