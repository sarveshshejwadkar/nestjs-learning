import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    create(product: Product) {
        this.products.push(product);
    }

    findAll() {
        return this.products;
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('could not find product');
        }
        return [product, productIndex];
    }

    getSingleProduct(id: string) {
        const product = this.findProduct(id)[0];
        return { ...product };
    }

    update(id: string, name: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updateProduct = { ...product };
        updateProduct.name = name;
        updateProduct.price = price;
        this.products[index] = updateProduct;
    }
}