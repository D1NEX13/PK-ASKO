import type { ReactNode } from 'react';
import { useCommonStore } from '../stores/Common.store';
import Drawer from 'antd/es/drawer/Drawer';
import Flex from 'antd/es/flex';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './DrawerCart.scss';
import EmptyCart from './components/EmptyCart/EmptyCart';
import Cart from './components/Cart/Cart';

const data = [{}];

function DrawerCart(): ReactNode {
	const { isOpenCart, openCart } = useCommonStore();

	return (
		<Drawer
			title={
				<Flex
					justify="end"
					gap={24}
					className="drawer-header"
				>
					<div>КОРЗИНА</div>
					<ShoppingCartOutlined />
				</Flex>
			}
			placement="right"
			onClose={() => openCart(false)}
			open={isOpenCart}
			styles={{
				header: {
					backgroundColor: '#F97316',
				},
			}}
		>
			{data.length < 1 ? <EmptyCart /> : <Cart />}
		</Drawer>
	);
}

export default DrawerCart;
