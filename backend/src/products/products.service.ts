import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConflictException } from '@nestjs/common';
import { QueryProductsDto } from './dto/query-products.dto';
import { Category } from '../categories/category.entity';
import { ProductsResponseDto } from './dto/products-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category) 
    private categoriesRepository: Repository<Category>,
  ) {}
    
  async create(createProductDto: CreateProductDto): Promise<Product> {
  
  const existingSlug = await this.productsRepository.findOne({ where: { slug: createProductDto.slug } });
  if (existingSlug) throw new ConflictException('Товар с таким slug уже существует');

  const existingArticle = await this.productsRepository.findOne({ where: { article: createProductDto.article } });
  if (existingArticle) throw new ConflictException('Товар с таким артикулом уже существует');

  let { categoryId, partType, ...rest } = createProductDto;

  if (!categoryId && partType) {
    const normalized = partType.trim().toLowerCase();
    const category = await this.categoriesRepository.findOne({
      where: [
        { name: ILike(normalized) },
        { slug: ILike(normalized) }
      ]
    });
    if (category) {
      categoryId = category.id;
    } else {
      throw new NotFoundException(`Категория с именем "${partType}" не найдена. Сначала создайте категорию.`);
    }
  }

  const product = this.productsRepository.create({ ...rest, partType, categoryId });
  return this.productsRepository.save(product);
}

  async findAll(query: QueryProductsDto): Promise<ProductsResponseDto> {
  const {
    search,
    minPrice,
    maxPrice,
    partType,
    categoryId,
    inStock,
    page = 1,
    limit = 12,
    sortBy = 'createdAt',
    order = 'DESC',
  } = query;

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

  if (inStock !== undefined) {
    qb.andWhere('product.inStock = :inStock', { inStock });
  }

  const allowedSortFields = ['price', 'name', 'sortOrder', 'createdAt', 'quantity'];
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

  async checkStock(productId: number, requestedQty: number): Promise<void> {
  const product = await this.productsRepository.findOne({ where: { id: productId } });
  if (!product) throw new NotFoundException(`Product ${productId} not found`);
  if (product.quantity < requestedQty) {
    throw new BadRequestException(
      `Недостаточно товара на складе. Доступно: ${product.quantity}, запрошено: ${requestedQty}`
    );
  }
    }

    async reserveStock(productId: number, quantityToReserve: number): Promise<void> {
    await this.productsRepository.decrement({ id: productId }, 'quantity', quantityToReserve);
    
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (product && product.quantity === 0 && product.inStock !== false) {
        await this.productsRepository.update(productId, { inStock: false });
    }
    } 
}