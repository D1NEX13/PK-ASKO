import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID товара должно быть числом' })
  @IsPositive({ message: 'ID товара должен быть положительным числом' })
  productId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'Количество должно быть числом' })
  @Min(1, { message: 'Количество должно быть не менее 1' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ enum: ['online', 'invoice', 'cash'] })
  @IsEnum(['online', 'invoice', 'cash'], { message: 'Способ оплаты должен быть одним из: online, invoice, cash' })
  paymentMethod: string;

  @ApiProperty({ enum: ['pickup', 'courier'] })
  @IsEnum(['pickup', 'courier'], { message: 'Способ доставки должен быть pickup или courier' })
  deliveryMethod: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Адрес доставки должен быть строкой' })
  deliveryAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Стоимость доставки должна быть числом' })
  @Min(0, { message: 'Стоимость доставки не может быть отрицательной' })
  deliveryPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Комментарий должен быть строкой' })
  comment?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray({ message: 'Товары должны быть переданы массивом' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}