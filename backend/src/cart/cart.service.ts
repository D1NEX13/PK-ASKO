import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/product.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { v4 as uuidv4 } from 'uuid';

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
      relations: ['items'],
    });
    if (!cart) {
      const newGuestId = !userId ? guestId || uuidv4() : undefined;
      cart = this.cartRepository.create(userId ? { userId } : { guestId: newGuestId });
      await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addToCart(userId: number | undefined, guestId: string | undefined, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    let cartItem = cart.items.find(item => item.productId === dto.productId);
    let newQuantity = dto.quantity;
    if (cartItem) {
      newQuantity = cartItem.quantity + dto.quantity;
    }
    
    if (product.quantity < newQuantity) {
      throw new BadRequestException(
        `Недостаточно товара на складе. Доступно: ${product.quantity}, запрошено: ${newQuantity}`
      );
    }

    if (cartItem) {
      cartItem.quantity = newQuantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      });
      await this.cartItemRepository.save(cartItem);
      cart.items = cart.items ? [...cart.items, cartItem] : [cartItem];
    }
    return this.getCart(userId, guestId);
  }

  async getCart(userId?: number, guestId?: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId, guestId);
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

    const product = await this.productRepository.findOne({ where: { id: cartItem.productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.quantity < dto.quantity) {
      throw new BadRequestException(
        `Недостаточно товара на складе. Доступно: ${product.quantity}`
      );
    }

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
    let cart: Cart | null = null;
    if (userId) cart = await this.cartRepository.findOne({ where: { userId } });
    else if (guestId) cart = await this.cartRepository.findOne({ where: { guestId } });
    if (cart) {
      await this.cartItemRepository.delete({ cartId: cart.id });
    }
  }

  async getCartByGuestId(guestId: string): Promise<Cart | null> {
    return this.cartRepository.findOne({ where: { guestId }, relations: ['items'] });
  }

  async getCartByUserId(userId: number): Promise<Cart | null> {
    return this.cartRepository.findOne({ where: { userId }, relations: ['items'] });
  }

  async createUserCart(userId: number): Promise<Cart> {
    const cart = this.cartRepository.create({ userId });
    return this.cartRepository.save(cart);
  }
}