import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsIn, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductsDto {
  @ApiPropertyOptional({ description: 'Поиск по названию или артикулу', example: 'втулка' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Минимальная цена', example: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена', example: 5000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Тип детали (Втулка, Палец, Кронштейн и т.д.)', example: 'Втулка' })
  @IsOptional()
  @IsString()
  partType?: string;

  @ApiPropertyOptional({ description: 'ID категории', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Наличие (true – в наличии, false – под заказ)', enum: ['true', 'false'] })
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  inStock?: string;

    @ApiPropertyOptional({ description: 'Минимальное количество на складе', example: 0 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    minQuantity?: number;

  @ApiPropertyOptional({ description: 'Номер страницы', default: 1, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Количество товаров на странице', default: 12, example: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 12;

  @ApiPropertyOptional({ description: 'Поле для сортировки', enum: ['price', 'name', 'sortOrder', 'createdAt', 'quantity'], default: 'createdAt' })
  @IsOptional()
  @IsString()
  @IsIn(['price', 'name', 'sortOrder', 'createdAt', 'quantity'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ description: 'Порядок сортировки', enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';
}