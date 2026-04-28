import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateFromCartDto } from './dto/create-from-cart.dto';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { In } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private cartService: CartService,
    private productsService: ProductsService,
    ) {}

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
  const productIds = dto.items.map(item => item.productId);
  const products = await this.productRepo.find({ where: { id: In(productIds) } });
  if (products.length !== productIds.length) {
    throw new BadRequestException('Одного или нескольких товаров не существует');
  }
  const productMap = new Map(products.map(p => [p.id, p]));

  let totalAmount = 0;
  for (const item of dto.items) {
    const product = productMap.get(item.productId);
    if (product.quantity < item.quantity) {
      throw new BadRequestException(
        `Недостаточно товара "${product.name}" на складе. Доступно: ${product.quantity}, запрошено: ${item.quantity}`
      );
    }
    totalAmount += product.price * item.quantity;
  }

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

  const orderItems = dto.items.map(item => {
    const product = productMap.get(item.productId);
    return this.orderItemRepo.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      priceAtTime: product.price,
    });
  });
  await this.orderItemRepo.save(orderItems);

  for (const item of dto.items) {
    await this.productsService.reserveStock(item.productId, item.quantity);
  }
  return this.findOne(userId, order.id);
}

    async createOrderFromCart(userId: number | null, guestId: string | null, dto: CreateFromCartDto): Promise<Order> {
    const cart = await this.cartService.getCart(userId, guestId);
    if (!cart || !cart.items.length) throw new BadRequestException('Корзина пуста');

    for (const item of cart.items) {
        await this.productsService.checkStock(item.productId, item.quantity);
    }

    for (const item of cart.items) {
        await this.productsService.reserveStock(item.productId, item.quantity);
    }

    const totalAmount = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const order = this.orderRepo.create({
        userId: userId ?? undefined,
        status: 'new',
        totalAmount,
        paymentMethod: dto.paymentMethod,
        deliveryMethod: dto.deliveryMethod,
        deliveryAddress: dto.deliveryAddress,
        deliveryPrice: dto.deliveryPrice,
        comment: dto.comment,
        items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.product.price,
        })),
    });
    const savedOrder = await this.orderRepo.save(order);

    await this.cartService.clearCart(userId, guestId);

    return savedOrder;
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

  async findUserOrders(userId: number, status?: string, page = 1, limit = 10) {
  const query = this.orderRepo.createQueryBuilder('order')
    .where('order.userId = :userId', { userId })
    .leftJoinAndSelect('order.items', 'items')
    .addSelect('SUM(items.quantity)', 'totalItems')
    .groupBy('order.id')
    .orderBy('order.createdAt', 'DESC')
    .skip((page - 1) * limit)
    .take(limit);

  if (status && status !== 'all') query.andWhere('order.status = :status', { status });

  const [items, total] = await query.getManyAndCount();
  
  const enrichedItems = items.map(order => ({
    ...order,
    totalItems: order.items.reduce((sum, i) => sum + i.quantity, 0),
  }));
  return { items: enrichedItems, total, page, limit, totalPages: Math.ceil(total / limit) };
}

  async findOne(userId: number, orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(orderId: number, newStatus: string, userId?: number, note?: string): Promise<Order> {
  const order = await this.orderRepo.findOne({ where: { id: orderId } });
  if (!order) throw new NotFoundException('Order not found');

  if (newStatus === 'cancelled' && ['shipped', 'delivered'].includes(order.status)) {
    throw new BadRequestException('Cannot cancel order that is shipped or delivered');
  }

  const oldStatus = order.status;
  order.status = newStatus;
  order.statusHistory = [
    ...(order.statusHistory || []),
    { status: newStatus, date: new Date(), note: note || `Status changed from ${oldStatus} to ${newStatus}` },
  ];
  await this.orderRepo.save(order);
    return order;
    }
}