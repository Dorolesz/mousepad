import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.products.create({
      data: {
        name: createProductDto.name,
        type: createProductDto.type,
        price: createProductDto.price,
        delivery_days: createProductDto.delivery_days,
        img: createProductDto.img,
      },
    });
    return {
      message: 'Sikeresen feltöltve',
      product,
    };
  }

  async order(product_id: number) {
    const product = await this.prisma.products.findUnique({
      where: {id: product_id}
    });

    if (!product) {
      throw new NotFoundException({message: 'A termék nem található'})
    }

    const newOrder = await this.prisma.orders.create({
      data: {
        product_id: product_id,
        price: product.price,
        deliver_days: product.delivery_days,
      },
      select: {
        id: true,
        product_id: true,
        price: true,
        deliver_days: true,
      }
    });

    return newOrder;
  }

  async findAll() {
    const products = this.prisma.products.findMany();
    return products;
  }

  async findOne(id: number) {
    const productId = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!productId) {
      throw new NotFoundException('Nem található termék');
    }
    return productId;
  }

  //
  //HIBA
  //nem módósítja az adatbázist
  async update(id: number, updateProductDto: UpdateProductDto) {
    const existing = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Nem található ilyen azonosítójú termék');
    }

    const updateProduct = await this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
    return {
      message: 'A termék sikeresen módosítva',
      updateProduct,
    };
  }
  //
  //
  //

  async remove(id: number) {
    const deleteProduct = await this.prisma.products.delete({
      where: { id },
    });
    return {
      statusCode: 200,
      message: 'Sikeresen törölve',
      deleteProduct,
    };
  }
}
