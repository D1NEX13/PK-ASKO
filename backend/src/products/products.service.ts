import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConflictException } from '@nestjs/common';
import { QueryProductsDto } from './dto/query-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    
    const existingSlug = await this.productsRepository.findOne({ where: { slug: createProductDto.slug } });
    if (existingSlug) throw new ConflictException('Товар с таким slug уже существует');
    const existingArticle = await this.productsRepository.findOne({ where: { article: createProductDto.article } });
    if (existingArticle) throw new ConflictException('Товар с таким артикулом уже существует');

    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(query: QueryProductsDto) {
    const { search, minPrice, maxPrice, partType, categoryId, inStock, page, limit, sortBy, order } = query;

    const qb = this.productsRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      qb.andWhere('(product.name ILIKE :search OR product.article ILIKE :search)', { search: `%${search}%` });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (partType) {
      qb.andWhere('product.partType = :partType', { partType });
    }

    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (inStock === 'true') {
      qb.andWhere('product.inStock = true');
    } else if (inStock === 'false') {
      qb.andWhere('product.inStock = false');
    }

    const allowedSortFields = ['price', 'name', 'sortOrder', 'createdAt'];
    const orderField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    qb.orderBy(`product.${orderField}`, order === 'ASC' ? 'ASC' : 'DESC');

    const take = limit;
    const skip = (page - 1) * limit;
    qb.take(take).skip(skip);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'certificates'],
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { slug },
      relations: ['category', 'certificates'],
    });
    if (!product) throw new NotFoundException(`Product with slug ${slug} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Product with id ${id} not found`);
  }

  async getUniquePartTypes(): Promise<string[]> {
    const result = await this.productsRepository
        .createQueryBuilder('product')
        .select('DISTINCT product.partType', 'partType')
        .where('product.partType IS NOT NULL')
        .getRawMany();
    return result.map(r => r.partType);
    }
}