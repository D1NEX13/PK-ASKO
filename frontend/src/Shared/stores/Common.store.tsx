import { create } from 'zustand';
import type { ICart } from '../types/cart.ts';

export interface ICommonStore {
	isOpenCart: boolean;
	token: string | null;
	openCart: (isOpen: boolean) => void;
	setToken: (token: string | null) => void;

	cartData: ICart | null;
	setCartData: (cartData: ICart | null) => void;
	fetchCart: () => Promise<void>;
}

export const useCommonStore = create<ICommonStore>()((set, get) => ({
	isOpenCart: false,
	token: localStorage.getItem('token'),

	openCart: (isOpenCart) => set((store) => ({ ...store, isOpenCart })),
	setToken: (token) =>
		set((store) => {
			if (token) {
				localStorage.setItem('token', token);
			} else {
				localStorage.removeItem('token');
			}
			return { ...store, token };
		}),

	cartData: null,
	setCartData: (cartData) => set((store) => ({ ...store, cartData })),
	fetchCart: async () => {
		const token = get().token;
		try {
			const res = await fetch('http://localhost:3000/cart', {
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) {
				console.error('Ошибка загрузки корзины');
				return;
			}
			const data: ICart = await res.json();
			set({ cartData: data });
		} catch (e) {
			console.error('Сетевая ошибка при загрузке корзины:', e);
		}
	},
}));
