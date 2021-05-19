import { Body, Controller, Get, Header, HttpCode, Param, Patch, Post, Query, Redirect } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/products.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    list(): Product[] {
        return this.productsService.findAll();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productsService.getSingleProduct(productId);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        this.productsService.create(createProductDto);
        const data = this.productsService.findAll();
        return [...data];
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body('name') name: string,
        @Body('price') price: number
    ) {
        this.productsService.update(id, name, price);
    }
}