import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {

    constructor( private readonly ProductService: ProductService ) { }

    @Get()
    async getProducts() {
        return await this.ProductService.getAll();
    }

    @Get('/:id')
    async getProduct( @Param('id', ParseIntPipe) id: number ) {
        return await this.ProductService.findById(id);
    }

    @Get('/busqueda/:name')
    async getProductReviews( @Param('name') name: string) {
        if ( !name || name === "" ) return this.getProducts();
        return await this.ProductService.findByName(name);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create( @Body() product: ProductDto ) {
        return await this.ProductService.create(product);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('/:id')
    async update( @Param('id', ParseIntPipe) id: number, @Body() product: ProductDto ) {
        return await this.ProductService.update(id, product);
    }

    @Delete('/:id')
    async delete( @Param('id', ParseIntPipe) id: number ) {
        return await this.ProductService.delete(id);
    }

}
