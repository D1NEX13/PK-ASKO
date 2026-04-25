import { ApiProperty, ApiPropertyOptional  } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: 'UUID гостя для синхронизации корзины' })
  @IsOptional()
  @IsUUID()
  guestId?: string;
}