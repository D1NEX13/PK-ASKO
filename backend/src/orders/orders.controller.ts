import { Controller, Get, Param, Query, UseGuards, Req, Post, Body, Patch, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateFromCartDto } from './dto/create-from-cart.dto';
import { Public } from '../auth/public.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Список заказов текущего пользователя с пагинацией (по 10) и фильтром по статусу' })
  @ApiQuery({ name: 'status', required: false, enum: ['all', 'processing', 'shipped', 'delivered', 'cancelled'] })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Список заказов' })
  async getOrders(
    @Req() req,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.findUserOrders(req.user.userId, status, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Детали заказа (с составом товаров)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Заказ с товарами' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async getOrder(@Req() req, @Param('id') id: number) {
    return this.ordersService.findOne(req.user.userId, id);
  }

  @Post()
    @ApiOperation({ summary: 'Создать новый заказ (из списка товаров)' })
    @ApiBody({ type: CreateOrderDto })
    async createOrder(@Req() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.userId, dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить заказ (статус, трек-номер, комментарий)' })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: UpdateOrderDto })
    async updateOrder(@Req() req, @Param('id') id: number, @Body() dto: UpdateOrderDto) {

    return this.ordersService.updateOrder(req.user.userId, id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить заказ (только для администратора)' })
    @ApiParam({ name: 'id' })
    async removeOrder(@Req() req, @Param('id') id: number) {
    
    return this.ordersService.removeOrder(req.user.userId, id);
    }

    @Post('from-cart')
    @ApiOperation({ summary: 'Создать заказ из текущей корзины' })
    @ApiBody({ type: CreateFromCartDto })
    async createOrderFromCart(@Req() req, @Body() dto: CreateFromCartDto, @Query('guestId') guestId?: string) {
    const userId = req.user?.userId;
    return this.ordersService.createOrderFromCart(userId, guestId, dto);
    }

    @Post('webhook/payment')
    @Public() 
    @ApiOperation({ summary: 'Webhook для уведомления об оплате (вызывается платёжной системой)' })
    async handlePaymentWebhook(@Body() body: any) {
    const orderId = body.orderId || body.object?.metadata?.order_id;
    if (!orderId) {
        throw new BadRequestException('Order ID not provided');
    }
    await this.ordersService.updateStatus(orderId, 'paid', undefined, 'Payment received');
    return { received: true };
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Изменить статус заказа (админ)' })
    @ApiBody({ schema: { example: { status: 'processing' } } })
    async changeStatus(@Param('id') id: number, @Body('status') status: string) {
    
    return this.ordersService.updateStatus(id, status);
    }
}