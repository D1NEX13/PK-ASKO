import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../../../../../Shared/types/product';

const { Meta } = Card;

function Catalog(): ReactNode {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch('http://localhost:3000/products');
			const data = await res.json();
			setProducts(data.items);
			setLoading(false);
		};
		fetchProducts();
	}, []);

	return (
		<Flex
			wrap={true}
			gap={32}
			justify="center"
			style={{ padding: 50 }}
		>
			{products.map((product) => (
				<Card
					loading={loading}
					key={product.id}
					style={{ width: 300 }}
					hoverable={true}
					cover={
						<div style={{ height: 180, overflow: 'hidden' }}>
							{product.images && product.images.length > 0 ? (
								<img
									style={{ width: '100%', height: '100%', objectFit: 'contain' }}
									src={`http://localhost:3000${product.images[0]}`}
									alt={product.name}
								/>
							) : undefined}
						</div>
					}
					actions={[
						<Flex
							justify="space-between"
							align="center"
							style={{ padding: '0 16px' }}
						>
							<Typography.Text strong>{product.price} ₽</Typography.Text>
							<ShoppingCartOutlined style={{ fontSize: 24 }} />
						</Flex>,
					]}
				>
					<Meta title={product.name} />
				</Card>
			))}
		</Flex>
	);
}

export default Catalog;
