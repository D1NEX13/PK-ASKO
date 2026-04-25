import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}