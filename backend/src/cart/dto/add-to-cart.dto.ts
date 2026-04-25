import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class AddToCartDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  guestId?: string;
}