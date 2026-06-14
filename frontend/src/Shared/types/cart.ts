import type { Product } from './product.ts';

export interface ICartItem {
	id: number;
	productId: number;
	quantity: number;
	product: Product
}

export interface ICart {
	id: number;
	guestId: number | null;
	items: ICartItem[];
	totalPrice: number;
}