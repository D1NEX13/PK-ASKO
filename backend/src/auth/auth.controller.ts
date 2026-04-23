import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, ConflictException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Public } from './public.decorator';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,) {}

  @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Вход в систему' })
    @ApiResponse({ status: 200, description: 'Успешный вход' })
    @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
        throw new UnauthorizedException('Неверный email или пароль');
    }
    return this.authService.login(user);
    }

  @Post('register')
    @Public()
    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 201, description: 'Пользователь создан' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Выход (инвалидация токена)' })
    @ApiResponse({ status: 200, description: 'Успешный выход' })
    async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
    }

    @Post('forgot-password')
    @Public()
    @ApiOperation({ summary: 'Запрос на сброс пароля' })
    @ApiResponse({ status: 200, description: 'Инструкция отправлена на email (если пользователь существует)' })
    @ApiBody({ type: ForgotPasswordDto })
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        await this.authService.requestPasswordReset(forgotPasswordDto.email);
        return { message: 'If the email exists, a reset link has been sent.' };
    }

    @Post('reset-password')
    @Public()
    @ApiOperation({ summary: 'Сброс пароля по токену' })
    @ApiResponse({ status: 200, description: 'Пароль изменён' })
  @ApiResponse({ status: 400, description: 'Недействительный или просроченный токен' })
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
    return { message: 'Password has been reset successfully' };
    }

}