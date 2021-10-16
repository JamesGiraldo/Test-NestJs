import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleType } from 'src/rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolesGuard } from './../guards/rol.guard';

@Controller('product')
export class ProductController {

    constructor( private readonly ProductService: ProductService ) { }

    @RolDecorator(RoleType.ADMIN, RoleType.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getProducts() {
        // @GetPrincipal() user: any
        // if (user.roles.indexOf( RoleType.ADMIN ) < 0 ) throw new UnauthorizedException(HTTP_MESSAGE.PRIVILEGES_NOT_ALLOWED)
        return await this.ProductService.getAll();
    }

    @RolDecorator(RoleType.ADMIN, RoleType.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:id')
    async getProduct( @Param('id', ParseIntPipe) id: number ) {
        return await this.ProductService.findById(id);
    }

    @RolDecorator(RoleType.ADMIN, RoleType.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/busqueda/:name')
    async getProductReviews( @Param('name') name: string) {
        // if ( !name || name === "" ) return this.getProducts();
        return await this.ProductService.findByName(name);
    }

    @RolDecorator(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create( @Body() product: ProductDto ) {
        return await this.ProductService.create(product);
    }

    @RolDecorator(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put('/:id')
    async update( @Param('id', ParseIntPipe) id: number, @Body() product: ProductDto ) {
        return await this.ProductService.update(id, product);
    }

    @RolDecorator(RoleType.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async delete( @Param('id', ParseIntPipe) id: number ) {
        return await this.ProductService.delete(id);
    }

}
