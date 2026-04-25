import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateFromCartDto {
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
}