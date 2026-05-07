import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useCommonStore } from '../stores/Common.store';
import Drawer from 'antd/es/drawer/Drawer';
import Flex from 'antd/es/flex';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './DrawerCart.scss';
import EmptyCart from './components/EmptyCart/EmptyCart';
import Cart from './components/Cart/Cart';
import type { Product } from '../types/product';

export interface ICartItem {
	id: number;
	cartId: number;
	productId: number;
	quantity: number;
	product: Product;
}

export interface ICartResponse {
	id: number;
	items: ICartItem[];
	totalPrice: number;
}

function DrawerCart(): ReactNode {
	const { isOpenCart, openCart } = useCommonStore();
	const token = localStorage.getItem('token');

	const [cartData, setCartData] = useState<ICartResponse | null>(null);

	const loadCart = useCallback(async () => {
		const res = await fetch('http://localhost:3000/cart', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			const data = await res.json();
			setCartData(data);
		} else {
			const error = await res.json();
			console.error('Ошибка загрузки корзины:', error);
		}
	}, [token]);

	useEffect(() => {
		if (isOpenCart) {
			loadCart();
		}
	}, [isOpenCart, token]);

	return (
		<Drawer
			title={
				<Flex
					justify="end"
					gap={24}
					className="drawer-header"
				>
					<div>КОРЗИНА</div>
					<ShoppingCartOutlined />
				</Flex>
			}
			placement="right"
			onClose={() => openCart(false)}
			open={isOpenCart}
			styles={{
				header: {
					backgroundColor: '#F97316',
				},
			}}
		>
			{cartData?.items && cartData.items.length > 0 ? (
				<Cart
					data={cartData}
					onRefresh={loadCart}
				/>
			) : (
				<EmptyCart />
			)}
		</Drawer>
	);
}

export default DrawerCart;
