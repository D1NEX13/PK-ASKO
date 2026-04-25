import { Controller, Get, Patch, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Данные профиля' })
  getProfile(@Req() req) {
    return this.profileService.getProfile(req.user.userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Обновить профиль (имя, фамилия, телефон, email)' })
  @ApiResponse({ status: 200, description: 'Профиль обновлён' })
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.userId, dto);
  }

  @Post('change-password')
    @ApiOperation({ summary: 'Сменить пароль' })
    @ApiResponse({ status: 200, description: 'Пароль успешно изменён', schema: { example: { message: 'Password changed successfully' } } })
    @ApiResponse({ status: 401, description: 'Неверный старый пароль' })
    @ApiResponse({ status: 400, description: 'Новый пароль слишком короткий или не соответствует требованиям' })
    async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    await this.profileService.changePassword(req.user.userId, dto);
        return { message: 'Пароль успешно изменен!' };
    }
}