import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Product } from '../../../../../Shared/types/product';
import { useCommonStore } from '../../../../../Shared/stores/Common.store';
import './ProductCard.scss';

interface ProductCardProps {
	product: Product;
}

const API_URL = 'http://localhost:3000';

function ProductCard({ product }: ProductCardProps): ReactNode {
	const { id, name, article, price, inStock, images, partType, quantity: stock } = product;

	const imageUrl = images && images.length > 0 ? `${API_URL}${images[0]}` : null;
	const token = useCommonStore((s) => s.token);
	const fetchCart = useCommonStore((s) => s.fetchCart);
	const cartData = useCommonStore((s) => s.cartData);

	const cartItem = cartData?.items?.find((item) => item.productId === id);
	const quantity = cartItem?.quantity ?? 0;

	function handleAddToCart(productId: number) {
		const addProduct = async () => {
			try {
				const response = await fetch(`${API_URL}/cart/items`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						productId: Number(productId),
						quantity: 1,
					}),
				});
				if (!response.ok) {
					const error = await response.json();
					console.error('Ошибка при добавлении товара:', error);
					return;
				}
				await fetchCart();
			} catch (error) {
				console.error('Ошибка при добавлении товара в корзину:', error);
			}
		};

		addProduct();
	}

	async function changeQuantity(itemId: number, newQuantity: number) {
		try {
			const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ quantity: newQuantity }),
			});
			if (!response.ok) {
				const error = await response.json();
				console.error('Ошибка при изменении количества:', error);
				return;
			}
			await fetchCart();
		} catch (error) {
			console.error('Ошибка при изменении количества товара:', error);
		}
	}

	async function removeFromCart(itemId: number) {
		try {
			const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				const error = await response.json();
				console.error('Ошибка при удалении товара:', error);
				return;
			}
			await fetchCart();
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины:', error);
		}
	}

	function handleDecrease() {
		if (!cartItem) return;
		if (cartItem.quantity > 1) {
			changeQuantity(cartItem.id, cartItem.quantity - 1);
		} else {
			removeFromCart(cartItem.id);
		}
	}

	return (
		<Flex
			vertical
			className="card-wrapper"
		>
			<div className="card-image-wrapper">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className="card-image"
					/>
				) : (
					<div className="card-image-placeholder">Нет фото</div>
				)}
				<div
					className={`stock-badge ${inStock ? 'stock-badge--available' : 'stock-badge--backorder'}`}
				>
					{inStock ? 'В НАЛИЧИИ' : 'ПОД ЗАКАЗ'}
				</div>
			</div>

			<Flex
				vertical
				gap={8}
				className="card-content"
			>
				<span className="card-article">Арт: {article}</span>
				<span className="card-name">{name}</span>
				{partType && (
					<div>
						<Tag>{partType}</Tag>
					</div>
				)}
				<Flex
					justify="space-between"
					align="center"
					className="card-footer"
				>
					<span className="card-price">{Number(price).toLocaleString('ru-RU')} ₽</span>
					{quantity > 0 ? (
						<Flex
							align="center"
							gap={8}
							className="card-qty"
						>
							<Button
								size="small"
								icon={<Minus size={14} />}
								onClick={handleDecrease}
							/>
							<span className="card-qty-value">{quantity}</span>
							<Button
								size="small"
								icon={<Plus size={14} />}
								onClick={() => handleAddToCart(id)}
								disabled={quantity >= stock}
							/>
						</Flex>
					) : (
						<Button
							type="default"
							size={'large'}
							icon={<ShoppingCartOutlined />}
							className="card-add-button"
							onClick={() => handleAddToCart(id)}
						/>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProductCard;
