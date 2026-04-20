import { IsString, IsOptional, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  parentId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  sortOrder?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}