import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product.entity';

class ProductListItemDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() slug: string;
  @ApiProperty() article: string;
  @ApiProperty() price: number;
  @ApiProperty() inStock: boolean;
  @ApiProperty({ type: [String], nullable: true }) images?: string[];
  @ApiProperty({ nullable: true }) partType?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ nullable: true }) quantity?: number;
}

export class ProductsResponseDto {
  @ApiProperty({ type: [ProductListItemDto] })
  items: ProductListItemDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 12 })
  limit: number;

  @ApiProperty({ example: 4 })
  totalPages: number;
}