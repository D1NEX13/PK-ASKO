import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
  ) {}

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    const totalAmount = dto.items.reduce((sum, item) => sum + (item.priceAtTime * item.quantity), 0);
    const order = this.orderRepo.create({
        userId,
        status: 'new',
        totalAmount,
        paymentMethod: dto.paymentMethod,
        deliveryMethod: dto.deliveryMethod,
        deliveryAddress: dto.deliveryAddress,
        deliveryPrice: dto.deliveryPrice,
        comment: dto.comment,
    });
    await this.orderRepo.save(order);
    const orderItems = dto.items.map(item => this.orderItemRepo.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
    }));
    await this.orderItemRepo.save(orderItems);
    return this.findOne(userId, order.id);
    }

    async updateOrder(userId: number, orderId: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundException('Order not found');
    Object.assign(order, dto);
    await this.orderRepo.save(order);
    return this.findOne(userId, orderId);
    }

    async removeOrder(userId: number, orderId: number): Promise<void> {
    const order = await this.orderRepo.findOne({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundException('Order not found');
    await this.orderRepo.remove(order);
    }
  async findUserOrders(userId: number, status?: string, page: number = 1, limit: number = 10) {
    const query = this.orderRepo.createQueryBuilder('order')
      .where('order.userId = :userId', { userId })
      .orderBy('order.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status && status !== 'all') {
      query.andWhere('order.status = :status', { status });
    }

    const [items, total] = await query.getManyAndCount();
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(userId: number, orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}