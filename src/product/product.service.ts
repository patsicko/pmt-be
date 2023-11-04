import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>
    ){}

    async all():Promise<Product[]>{
        return this.productRepository.find()
    }

    async create(data):Promise<Product>{
        return this.productRepository.save(data)
    }

    async get(id):Promise<Product | undefined>{
        return  await this.productRepository.findOneBy({id})
    }

    async update(id:number,data):Promise<any>{
        return await this.productRepository.update(id,data)
    }

    async delete(id:number):Promise<any>{
        return await this.productRepository.delete(id)
    }
}
