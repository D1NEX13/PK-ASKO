import { Button, Flex, Typography } from 'antd';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { type ReactNode } from 'react';
import './CartItem.scss';

const API_URL = 'http://localhost:3000';

interface CartItemProps {
	id: number;
	name: string;
	article?: string;
	price: number;
	quantity: number;
	image?: string;
	onRefresh?: () => Promise<void>;
}

function CartItem(props: CartItemProps): ReactNode {
	const { id, name, article, price, quantity, image, onRefresh } = props;
	const imageUrl = image ? `${API_URL}${image}` : null;
	const token = localStorage.getItem('token');

	async function handleChangeQuantity(productId: number, newQuantity: number) {
		try {
			const response = await fetch(`${API_URL}/cart/items/${productId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					productId: Number(productId),
					quantity: newQuantity,
				}),
			});
			if (response.ok && onRefresh) {
				await onRefresh();
			}
		} catch (error) {
			console.error('Ошибка при обновлении количества товара в корзине:', error);
		}
	}

	async function HandleDeleteCartItem(itemId: number) {
		try {
			const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					productId: Number(itemId),
				}),
			});
			if (response.ok && onRefresh) {
				await onRefresh();
			}
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины:', error);
		}
	}

	return (
		<Flex
			gap={12}
			style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={name}
					className="img-item"
				/>
			) : (
				<div className="img-empty">Нет фото</div>
			)}
			<Flex
				vertical={true}
				style={{ flex: 1 }}
				gap={6}
			>
				<Typography.Text
					strong
					style={{ fontSize: 13, lineHeight: '1.3' }}
				>
					{name}
				</Typography.Text>
				{article && (
					<Typography.Text
						type="secondary"
						style={{ fontSize: 12 }}
					>
						Арт: {article}
					</Typography.Text>
				)}
				<Flex
					align="center"
					justify="space-between"
				>
					<Flex
						align="center"
						gap={8}
					>
						<Button
							size="small"
							icon={<Minus size={12} />}
							onClick={() => handleChangeQuantity(id, quantity - 1)}
							disabled={quantity <= 1}
						/>
						<Typography.Text>{quantity}</Typography.Text>
						<Button
							size="small"
							icon={<Plus size={12} />}
							onClick={() => handleChangeQuantity(id, quantity + 1)}
						/>
					</Flex>
					<Flex
						align="center"
						gap={12}
					>
						<Typography.Text strong>
							{(price * quantity).toLocaleString('ru-RU')} ₽
						</Typography.Text>
						<Button
							type="text"
							size="small"
							danger
							icon={<Trash2 size={16} />}
							onClick={() => HandleDeleteCartItem(id)}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default CartItem;
