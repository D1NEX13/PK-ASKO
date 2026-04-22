import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { ProductsResponseDto } from './dto/products-response.dto';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать товар (только админ)' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Товар создан', type: Product })
  @ApiResponse({ status: 409, description: 'Товар с таким slug или артикулом уже существует' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Получить список товаров с пагинацией, фильтрацией, поиском и сортировкой' })
  @ApiResponse({ status: 200, description: 'Список товаров', type: ProductsResponseDto })
  async findAll(@Query() query: QueryProductsDto): Promise<ProductsResponseDto> {
    return this.productsService.findAll(query);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Получить товар по slug (для ЧПУ)' })
  @ApiParam({ name: 'slug', description: 'Уникальный slug товара', example: 'vtulka-paltsa-ural' })
  @ApiResponse({ status: 200, description: 'Товар найден', type: Product })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
  @ApiResponse({ status: 200, description: 'Товар найден', type: Product })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить товар (только админ)' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Товар обновлён', type: Product })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить товар (только админ)' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар удалён' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}