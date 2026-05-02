import { Controller, Post, Body, Get, Patch, Delete, Param, Query, Req, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Public } from '../auth/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('items')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить товар в корзину (поддерживает авторизованных и гостей)' })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({ status: 201, description: 'Товар добавлен', schema: { example: { item: { id: 1, cartId: 1, productId: 1, quantity: 2 }, cartId: 1, guestId: 'uuid', isNewCart: false } } })
  @ApiResponse({ status: 400, description: 'Не указан userId или guestId / некорректные данные' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async addItem(@Req() req, @Body() addToCartDto: AddToCartDto) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
      } catch (error) {}
    }
    if (!userId && !addToCartDto.guestId) {
      throw new BadRequestException('Either userId or guestId must be provided');
    }
    const result = await this.cartService.addToCart(userId, addToCartDto.guestId, addToCartDto);
    return result;
  }

  @Get()
    @Public()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получить корзину (товары с ценами)' })
    @ApiQuery({ name: 'guestId', required: false, description: 'UUID гостя (только для неавторизованных)' })
    @ApiResponse({ status: 200, description: 'Объект корзины', schema: { example: { id: 1, guestId: null, items: [{ id: 1, productId: 1, quantity: 2, product: { id: 1, name: 'Втулка', price: 450 } }], totalPrice: 900 } } })
    async getCart(@Query('guestId') guestId: string, @Req() req) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
        } catch (error) {}
    }
    const cart = await this.cartService.getCart(userId, guestId);
    if (!cart) {
        return { items: [], totalPrice: 0 };
    }
    
    const totalPrice = cart.items.reduce((sum, item) => {
        const price = item.product?.price ?? 0;
        return sum + price * item.quantity;
    }, 0);
    
    const { userId: _, ...cartWithoutUserId } = cart;
    return { ...cartWithoutUserId, totalPrice };
    }

    @Get('count')
    @Public()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получить общее количество товаров в корзине (для бейджа)' })
    @ApiQuery({ name: 'guestId', required: false })
    @ApiResponse({ status: 200, description: 'Количество позиций', schema: { example: { count: 3 } } })
    async getCartCount(@Query('guestId') guestId: string, @Req() req) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
        } catch (error) {}
    }
    const cart = await this.cartService.getCart(userId, guestId);
    const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return { count: totalCount };
    }

  @Patch('items/:itemId')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменить количество товара в корзине' })
  @ApiQuery({ name: 'guestId', required: false, description: 'UUID гостя' })
  @ApiParam({ name: 'itemId', description: 'ID позиции в корзине' })
  @ApiBody({ type: UpdateCartItemDto })
  @ApiResponse({ status: 200, description: 'Позиция обновлена', schema: { example: { id: 1, cartId: 1, productId: 1, quantity: 5 } } })
  @ApiResponse({ status: 404, description: 'Позиция не найдена' })
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Query('guestId') guestId: string,
    @Req() req,
  ) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
      } catch (error) {}
    }
    return this.cartService.updateCartItem(userId, guestId, +itemId, updateCartItemDto);
  }

  @Delete('items/:itemId')
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить одну позицию из корзины' })
  @ApiQuery({ name: 'guestId', required: false, description: 'UUID гостя' })
  @ApiParam({ name: 'itemId', description: 'ID позиции' })
  @ApiResponse({ status: 200, description: 'Позиция удалена', schema: { example: { success: true } } })
  @ApiResponse({ status: 404, description: 'Позиция не найдена' })
  async removeItem(@Param('itemId') itemId: string, @Query('guestId') guestId: string, @Req() req) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
      } catch (error) {}
    }
    await this.cartService.removeCartItem(userId, guestId, +itemId);
    return { success: true };
  }

  @Delete()
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Очистить всю корзину' })
  @ApiQuery({ name: 'guestId', required: false, description: 'UUID гостя' })
  @ApiResponse({ status: 200, description: 'Корзина очищена', schema: { example: { success: true } } })
  async clearCart(@Query('guestId') guestId: string, @Req() req) {
    let userId: number | undefined = undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        userId = payload.sub;
      } catch (error) {}
    }
    await this.cartService.clearCart(userId, guestId);
    return { success: true };
  }
}