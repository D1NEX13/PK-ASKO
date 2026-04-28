import { Flex, Segmented } from 'antd';
import type { ReactNode } from 'react';
import ProfileCard from '../../../../../Shared/ProfileCard/ProfileCard';
import { UserOutlined } from '@ant-design/icons';
import OrderItem from './components/OrderItem/OrderItem';

const segmentedOptions = ['ВСЕ', 'В ОБРАБОТКЕ', 'ОТПРАВЛЕН', 'ДОСТАВЛЕН', 'ОТМЕНЁН'];

const orders = [
	{
		id: 1,
		code: 'ORD-001',
		date: '2024-06-01',
		status: 'В ОБРАБОТКЕ',
		total: 1500,
		products: [
			{ id: 1, name: 'Продукт 1', quantity: 2, price: 500 },
			{ id: 2, name: 'Продукт 2', quantity: 1, price: 500 },
		],
	},
	{
		id: 2,
		code: 'ORD-002',
		date: '2024-06-02',
		status: 'ОТПРАВЛЕН',
		total: 2000,
		products: [{ id: 3, name: 'Продукт 3', quantity: 4, price: 500 }],
	},
	{
		id: 3,
		code: 'ORD-003',
		date: '2024-06-03',
		status: 'ДОСТАВЛЕН',
		total: 2500,
		products: [{ id: 4, name: 'Продукт 4', quantity: 5, price: 500 }],
	},
];

function Orders(): ReactNode {
	return (
		<Flex
			vertical={true}
			gap={24}
		>
			<ProfileCard
				icon={<UserOutlined />}
				title="ЛИЧНЫЕ ДАННЫЕ"
			>
				<Segmented<string | number>
					options={segmentedOptions}
					block
					defaultValue={segmentedOptions[0]}
				/>
			</ProfileCard>
			{orders.map((order) => (
				<OrderItem
					orderId={order.id}
					code={order.code}
					date={order.date}
					status={order.status}
					total={order.total}
					products={order.products}
				/>
			))}
		</Flex>
	);
}

export default Orders;
