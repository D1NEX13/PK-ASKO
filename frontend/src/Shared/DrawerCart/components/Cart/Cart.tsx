import { Button, Divider, Flex, Typography } from 'antd';
import { ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';
import CartItem from './components/CartItem';
import type { ICart, ICartItem } from '../../../types/cart';
import { useCommonStore } from '../../../stores/Common.store';

interface ICartProps {
	data: ICart | null;
}

function Cart({ data }: ICartProps): ReactNode {
	const token = useCommonStore((s) => s.token);
	const fetchCart = useCommonStore((s) => s.fetchCart);

	const ClearCart = async () => {
		const res = await fetch('http://localhost:3000/cart', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			await fetchCart();
		} else {
			const error = await res.json();
			console.error('Ошибка очистки корзины:', error);
		}
	};

	return (
		<Flex
			vertical={true}
			justify="space-between"
			style={{ height: '100%' }}
		>
			<Flex vertical={true}>
				{data?.items?.map((item: ICartItem) => (
					<CartItem
						key={item.id}
						id={item.id}
						name={item.product.name}
						article={item.product.article}
						price={Number(item.product.price)}
						quantity={item.quantity}
						image={item.product.images?.[0]}
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
						Товаров: {data?.items.length}{' '}
						{data?.items.length === 1 ? 'позиция' : 'позиции'}
					</Typography.Text>
					<Button
						type="text"
						danger={true}
						size="large"
						onClick={ClearCart}
					>
						Очистить корзину
					</Button>
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
						{data?.totalPrice.toLocaleString('ru-RU')} ₽
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
					icon={<ChevronRight size={18} />}
					iconPlacement="end"
					style={{ marginTop: 8, letterSpacing: 1 }}
				>
					К ОФОРМЛЕНИЮ
				</Button>

				<Button
					type="link"
					href="/catalog"
				>
					Продолжить покупки
				</Button>
			</Flex>
		</Flex>
	);
}

export default Cart;
