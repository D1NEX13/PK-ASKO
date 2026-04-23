import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Public } from './public.decorator';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService,) {}

  @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Вход в систему' })
    @ApiBody({ type: LoginDto })  
    async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Неверный email или пароль');
    return this.authService.login(user);
    }

  @Post('register')
  @Public()
  async register(@Body() body: { email: string; password: string; firstName?: string; lastName?: string; phone?: string }) {
    try {
      const user = await this.usersService.create(body);
      const { password, ...userWithoutPassword } = user;
      const token = await this.authService.login(userWithoutPassword);
      return { user: userWithoutPassword, ...token };
    } 
    catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new UnauthorizedException('Ошибка при регистрации');
    }
  }
}