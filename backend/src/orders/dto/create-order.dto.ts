import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  priceAtTime: number;
}

export class CreateOrderDto {
  @ApiProperty({ enum: ['online', 'invoice', 'cash'] })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ enum: ['pickup', 'courier'] })
  @IsString()
  deliveryMethod: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  deliveryPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}