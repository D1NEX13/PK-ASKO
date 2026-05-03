import { Button, Flex } from 'antd';
import { PackageOpen } from 'lucide-react';
import type { ReactNode } from 'react';
import './EmptyCart.scss';
import { ShoppingOutlined } from '@ant-design/icons';

function EmptyCart(): ReactNode {
	return (
		<Flex
			justify="center"
			align="center"
			style={{ height: '100%' }}
		>
			<Flex
				vertical={true}
				align="center"
				gap={16}
				style={{ color: '#597487' }}
			>
				<div className="icon-wrapper">
					<PackageOpen size={40} />
				</div>
				<span className="empty-title">КОРЗИНА ПУСТА</span>
				<span className="empty-description">
					Добавьте товары из каталога, чтобы оформить заказ
				</span>
				<Button
					icon={<ShoppingOutlined />}
					type="primary"
					size="large"
					href="/catalog"
				>
					Перейти в каталог
				</Button>
			</Flex>
		</Flex>
	);
}

export default EmptyCart;
