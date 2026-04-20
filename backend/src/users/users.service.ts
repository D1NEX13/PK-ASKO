import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Поиск пользователя по email 
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Поиск пользователя по id 
  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Создание нового пользователя 
  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.findOneByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже зарегистрирован');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    
    return this.usersRepository.save(newUser);
  }

}