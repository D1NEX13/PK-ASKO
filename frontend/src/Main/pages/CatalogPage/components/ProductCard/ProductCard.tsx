import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import type { ReactNode } from 'react';
import type { Product } from '../../../../../Shared/types/product';
import './ProductCard.scss';

interface ProductCardProps {
	product: Product;
}

const API_URL = 'http://localhost:3000';

function ProductCard({ product }: ProductCardProps): ReactNode {
	const { id, name, article, price, inStock, images, partType } = product;

	const imageUrl = images && images.length > 0 ? `${API_URL}${images[0]}` : null;
	const token = localStorage.getItem('token');
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
				console.log(`Товар ${name} добавлен в корзину`);
			} catch (error) {
				console.error('Ошибка при добавлении товара в корзину:', error);
			}
		};

		addProduct();
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
					<Button
						type="default"
						icon={<ShoppingCartOutlined />}
						className="card-add-button"
						onClick={() => handleAddToCart(id)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProductCard;
