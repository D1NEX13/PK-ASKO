export class CartItemResponseDto {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

export class CartResponseDto {
  id: number;
  items: CartItemResponseDto[];
  totalItems: number;
  totalPrice: number;
}