import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateServiceDto): Promise<Service> {
    const existing = await this.serviceRepo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Услуга с таким slug уже существует');
    const service = this.serviceRepo.create(dto);
    return this.serviceRepo.save(service);
  }

  async findAll(tags?: string): Promise<Service[]> {
  const queryBuilder = this.serviceRepo.createQueryBuilder('service');
  if (tags) {
    const tagsArray = tags.split(',').map(t => t.trim());
    queryBuilder.andWhere('service.tags && :tags', { tags: tagsArray });
  }
  return queryBuilder.orderBy('service.sortOrder', 'ASC').addOrderBy('service.createdAt', 'DESC').getMany();
}
  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException('Услуга не найдена');
    return service;
  }

  async findBySlug(slug: string): Promise<Service> {
    const service = await this.serviceRepo.findOne({ where: { slug } });
    if (!service) throw new NotFoundException('Услуга не найдена');
    return service;
  }

  async update(id: number, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return this.serviceRepo.save(service);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Услуга не найдена');
  }
}