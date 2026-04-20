import { Controller, Post, Body, Get, Delete, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Public } from '../auth/public.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('items')
  @Public()
  async addItem(
    @Body() addToCartDto: AddToCartDto,
    @Query('guestId') guestId: string,
    @Req() req,
  ) {
    const userId = req.user?.id;
    return this.cartService.addToCart(userId, guestId, addToCartDto);
  }

  @Get()
  @Public()
  async getCart(@Query('guestId') guestId: string, @Req() req) {
    const userId = req.user?.id;
    return this.cartService.getCart(userId, guestId);
  }

  @Patch('items/:itemId')
  @Public()
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Query('guestId') guestId: string,
    @Req() req,
  ) {
    const userId = req.user?.id;
    return this.cartService.updateCartItem(userId, guestId, +itemId, updateCartItemDto);
  }

  @Delete('items/:itemId')
  @Public()
  async removeItem(
    @Param('itemId') itemId: string,
    @Query('guestId') guestId: string,
    @Req() req,
  ) {
    const userId = req.user?.id;
    return this.cartService.removeCartItem(userId, guestId, +itemId);
  }

  @Delete()
  @Public()
  async clearCart(@Query('guestId') guestId: string, @Req() req) {
    const userId = req.user?.id;
    return this.cartService.clearCart(userId, guestId);
  }
}