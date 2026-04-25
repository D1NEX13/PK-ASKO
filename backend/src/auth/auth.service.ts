import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { PasswordResetToken } from './password-reset-token.entity';
import { BlacklistedToken } from './blacklisted-token.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
    
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private resetTokenRepo: Repository<PasswordResetToken>,
    @InjectRepository(BlacklistedToken)
    private blacklistRepo: Repository<BlacklistedToken>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
    }
    return null;
    }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, phone, companyName } = registerDto;
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already exists');

    let baseUsername = email.split('@')[0];
    let username = baseUsername;
    let counter = 1;
    while (await this.userRepo.findOne({ where: { username } })) {
        username = `${baseUsername}_${counter++}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        companyName,
        username,
        role: 'customer',
    });
    await this.userRepo.save(newUser);
    const { password: _, ...user } = newUser;
        return { user, ...await this.login(user) };
    }

  async logout(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.decode(token) as any;
      if (!decoded || !decoded.exp) throw new Error();
      const expiresAt = new Date(decoded.exp * 1000);
      await this.blacklistRepo.save({ token, expiresAt });
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const record = await this.blacklistRepo.findOne({ where: { token } });
    if (record && record.expiresAt < new Date()) {
      await this.blacklistRepo.remove(record);
      return false;
    }
    return !!record;
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
       
        return;
    }
    
    await this.resetTokenRepo.delete({ userId: user.id });
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    await this.resetTokenRepo.save({ token, userId: user.id, expiresAt });
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    
    console.log(`Reset password link: ${resetUrl}`);
    
    try{
        await this.mailerService.sendMail({
        to: user.email,
        subject: 'Восстановление пароля',
        text: `Перейдите по ссылке: ${resetUrl}`,
    });
    } catch (error) {
        console.error('Mail error:', error);
    
        }
    }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await this.resetTokenRepo.findOne({
        where: { token },
        relations: ['user'],
    });
    if (!resetToken) {
        throw new BadRequestException('Токен не найден. Возможно, ссылка уже использована или недействительна.');
    }
    if (resetToken.expiresAt < new Date()) {
        throw new BadRequestException('Срок действия токена истёк. Пожалуйста, запросите восстановление пароля заново.');
    }
    const user = resetToken.user;
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepo.save(user);
    await this.resetTokenRepo.delete({ id: resetToken.id });
    }
}
