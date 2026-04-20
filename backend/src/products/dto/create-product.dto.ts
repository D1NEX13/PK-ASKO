import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  article: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  weight?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  length?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  width?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  height?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  inStock?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  partType?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  sortOrder?: number;
}