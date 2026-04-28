import { DropboxCircleFilled } from '@ant-design/icons';
import { Collapse, Flex } from 'antd';
import type { ReactNode } from 'react';

interface OrderItemProduct {
	id: number;
	name: string;
	quantity: number;
	price: number;
}

interface OrderItemProps {
	orderId: number;
	code: string;
	date: string;
	status: string;
	total: number;
	products: OrderItemProduct[];
}

function OrderItem(props: OrderItemProps): ReactNode {
	const { orderId, code, date, status, total, products } = props;

	const items = [
		{
			key: orderId,
			label: (
				<Flex justify="space-between">
					<Flex gap={24}>
						<span>{code}</span>
						<span>{date}</span>
						<span>{status}</span>
					</Flex>
					<span>{total} ₽</span>
				</Flex>
			),
			children: (
				<Flex
					vertical
					gap={8}
				>
					<span style={{ fontSize: 12, opacity: 0.6 }}>СОСТАВ ЗАКАЗА</span>
					{products.map((product) => (
						<Flex
							key={product.id}
							justify="space-between"
							align="center"
						>
							<Flex gap={8}>
								<DropboxCircleFilled />
								<span>{product.name}</span>
							</Flex>

							<Flex gap={32}>
								<span>× {product.quantity}</span>
								<span style={{ fontWeight: 600 }}>{product.price} ₽</span>
							</Flex>
						</Flex>
					))}
					<Flex
						justify="flex-end"
						gap={16}
					>
						<span>ИТОГО:</span>
						<span style={{ fontWeight: 700 }}>{total} ₽</span>
					</Flex>
				</Flex>
			),
		},
	];
	return (
		<Collapse
			items={items}
			size="large"
			styles={{
				header: { background: '#FFF', borderRadius: 8 },
				body: { background: '#f4f7f8' },
			}}
		/>
	);
}

export default OrderItem;
