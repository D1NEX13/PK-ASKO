import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Service } from './service.entity';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать услугу (только админ)' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({ status: 201, type: Service })
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Получить список всех услуг' })
  @ApiResponse({ status: 200, type: [Service] })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Получить услугу по ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Service })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Получить услугу по slug' })
  @ApiParam({ name: 'slug' })
  @ApiResponse({ status: 200, type: Service })
  findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить услугу (только админ)' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({ status: 200, type: Service })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить услугу (только админ)' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Услуга удалена' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}