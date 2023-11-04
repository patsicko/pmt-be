import { Body, Controller, Get,Post,  Param, Put, Delete} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    
    constructor(private productService:ProductService){

    }
    @Get()
    all(){
               return this.productService.all();
}

@Post()
create(
    @Body('title') title:string,
    @Body('image') image:string,
    @Body('likes') likes:number,
){
 return this.productService.create({
    title,
    image,
    likes
 })
}

@Get(':id')
async get(@Param('id') id:number){
return this.productService.get(id)
}

@Put(':id')
async update(
    @Param('id') id:number,
    @Body('title') title:string,
    @Body('image') image:string,
    @Body('likes') likes:number,
    ){
        return this.productService.update(id,{
            title,
            image,
            likes
        });
    }



    @Delete(':id')
    async delete(
        @Param('id') id:number

    ){
        return this.productService.delete(id)
    }

}