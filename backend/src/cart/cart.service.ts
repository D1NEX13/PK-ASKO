import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/product.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private async getOrCreateCart(userId?: number, guestId?: string): Promise<Cart> {
    if (!userId && !guestId) {
      throw new BadRequestException('Either userId or guestId must be provided');
    }
    let cart = await this.cartRepository.findOne({
      where: userId ? { userId } : { guestId },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      cart = this.cartRepository.create(userId ? { userId } : { guestId });
      cart = await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addToCart(userId: number | undefined, guestId: string | undefined, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    let cartItem = cart.items.find(item => item.productId === dto.productId);
    if (cartItem) {
      cartItem.quantity += dto.quantity;
    } else {
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      });
      cart.items.push(cartItem);
    }
    await this.cartItemRepository.save(cartItem);
    return this.getCart(userId, guestId);
  }

  async getCart(userId?: number, guestId?: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
    // загружаем связи с продуктами
    const cartWithProducts = await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: ['items', 'items.product'],
    });
    return cartWithProducts;
  }

  async updateCartItem(userId: number | undefined, guestId: string | undefined, itemId: number, dto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
    const cartItem = cart.items.find(item => item.id === itemId);
    if (!cartItem) throw new NotFoundException('Cart item not found');
    cartItem.quantity = dto.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.getCart(userId, guestId);
  }

  async removeCartItem(userId: number | undefined, guestId: string | undefined, itemId: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
    const cartItem = cart.items.find(item => item.id === itemId);
    if (!cartItem) throw new NotFoundException('Cart item not found');
    await this.cartItemRepository.remove(cartItem);
    return this.getCart(userId, guestId);
  }

  async clearCart(userId?: number, guestId?: string): Promise<void> {
    const cart = await this.getOrCreateCart(userId, guestId);
    await this.cartItemRepository.delete({ cartId: cart.id });
  }
}