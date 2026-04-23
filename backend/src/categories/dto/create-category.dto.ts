import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Цилиндр', description: 'Название категории' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'cilindr', description: 'Уникальный slug (ЧПУ)' })
  @IsString()
  slug: string;

  @ApiProperty({ required: false, example: null, description: 'ID родительской категории' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  parentId?: number;

  @ApiProperty({ required: false, example: 10, description: 'Порядок сортировки' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  sortOrder?: number;

  @ApiProperty({ required: false, example: 'https://...', description: 'URL изображения категории' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}