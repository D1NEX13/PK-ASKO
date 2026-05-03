import { Button, Divider, Flex, Typography } from 'antd';
import { ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import CartItem from './components/CartItem';
import { useCommonStore } from '../../../stores/Common.store';
import type { Product } from '../../../types/product';

interface ICartItem {
	id: number;
	cartId: number;
	productId: number;
	quantity: number;
	product: Product;
}

interface ICartResponse {
	id: number;
	items: ICartItem[];
	totalPrice: number;
}

function Cart(): ReactNode {
	const token = localStorage.getItem('token');
	const { isOpenCart } = useCommonStore();

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
	console.log(cartData);

	useEffect(() => {
		if (isOpenCart) {
			loadCart();
		}
	}, [isOpenCart, loadCart]);

	return (
		<Flex
			vertical={true}
			justify="space-between"
			style={{ height: '100%' }}
		>
			<Flex vertical={true}>
				{cartData?.items?.map((item: ICartItem) => (
					<CartItem
						key={item.id}
						id={item.id}
						name={item.product.name}
						article={item.product.article}
						price={Number(item.product.price)}
						quantity={item.quantity}
						image={item.product.images?.[0]}
						onRefresh={loadCart}
					/>
				))}
			</Flex>

			<Flex
				vertical={true}
				gap={8}
			>
				<Divider style={{ margin: '8px 0' }} />

				<Flex
					justify="space-between"
					align="center"
				>
					<Typography.Text>
						Товаров: {cartData?.items.length}{' '}
						{cartData?.items.length === 1 ? 'позиция' : 'позиции'}
					</Typography.Text>
					<Typography.Link
						type="danger"
						style={{ color: '#E53935' }}
					>
						Очистить корзину
					</Typography.Link>
				</Flex>

				<Flex
					justify="space-between"
					align="center"
				>
					<Typography.Text strong>ИТОГО:</Typography.Text>
					<Typography.Text
						strong
						style={{ fontSize: 16 }}
					>
						{/* {cartData?.totalPrice.toLocaleString('ru-RU')} ₽ */}
					</Typography.Text>
				</Flex>

				<Typography.Text
					type="secondary"
					style={{ fontSize: 12 }}
				>
					Стоимость доставки рассчитывается при оформлении заказа. Менеджер свяжется с
					вами для уточнения деталей.
				</Typography.Text>

				<Button
					type="primary"
					size="large"
					block
					icon={<ChevronRight size={18} />}
					iconPosition="end"
					style={{ marginTop: 8, letterSpacing: 1 }}
				>
					К ОФОРМЛЕНИЮ
				</Button>

				<Button
					type="link"
					block
				>
					Продолжить покупки
				</Button>
			</Flex>
		</Flex>
	);
}

export default Cart;
