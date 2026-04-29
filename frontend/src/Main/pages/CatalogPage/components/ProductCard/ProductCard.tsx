import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import type { ReactNode } from 'react';
import type { Product } from '../../../../../Shared/types/product';

interface ProductCardProps {
	product: Product;
}

const API_URL = 'http://localhost:3000';

function ProductCard({ product }: ProductCardProps): ReactNode {
	const { name, article, price, inStock, images, partType } = product;

	const imageUrl = images && images.length > 0 ? `${API_URL}${images[0]}` : null;

	return (
		<Flex
			vertical
			style={{
				background: '#fff',
				borderRadius: 12,
				overflow: 'hidden',
				boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
				height: '100%',
			}}
		>
			<div style={{ position: 'relative' }}>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						style={{
							width: '100%',
							height: 200,
							objectFit: 'contain',
							display: 'block',
						}}
					/>
				) : (
					<div
						style={{
							width: '100%',
							height: 200,
							background: '#f0f0f0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#aaa',
						}}
					>
						Нет фото
					</div>
				)}
				<div
					style={{
						position: 'absolute',
						top: 12,
						left: 12,
						background: inStock ? '#52c41a' : '#F97316',
						color: '#fff',
						fontSize: 11,
						fontWeight: 700,
						padding: '3px 10px',
						borderRadius: 4,
						letterSpacing: 0.5,
					}}
				>
					{inStock ? 'В НАЛИЧИИ' : 'ПОД ЗАКАЗ'}
				</div>
			</div>

			<Flex
				vertical
				gap={8}
				style={{ padding: 16, flex: 1 }}
			>
				<span style={{ fontSize: 12, color: '#888' }}>Арт: {article}</span>
				<span style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{name}</span>
				{partType && (
					<div>
						<Tag>{partType}</Tag>
					</div>
				)}
				<Flex
					justify="space-between"
					align="center"
					style={{ marginTop: 'auto', paddingTop: 8 }}
				>
					<span style={{ fontWeight: 700, fontSize: 18 }}>
						{Number(price).toLocaleString('ru-RU')} ₽
					</span>
					<Button
						type="default"
						icon={<ShoppingCartOutlined />}
						style={{ color: '#4a90d9', borderColor: '#c8dff5', background: '#eef5fc' }}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProductCard;
