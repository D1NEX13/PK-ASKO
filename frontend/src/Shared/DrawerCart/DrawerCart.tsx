import { useEffect, type ReactNode } from 'react';
import { useCommonStore } from '../stores/Common.store';
import Drawer from 'antd/es/drawer/Drawer';
import Flex from 'antd/es/flex';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './DrawerCart.scss';
import EmptyCart from './components/EmptyCart/EmptyCart';
import Cart from './components/Cart/Cart';

function DrawerCart(): ReactNode {
	const isOpenCart = useCommonStore((s) => s.isOpenCart);
	const openCart = useCommonStore((s) => s.openCart);
	const cartData = useCommonStore((s) => s.cartData);
	const fetchCart = useCommonStore((s) => s.fetchCart);

	// при открытии корзины подтягиваем свежие данные
	useEffect(() => {
		if (isOpenCart) {
			void fetchCart();
		}
	}, [isOpenCart, fetchCart]);

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
			{cartData?.items && cartData.items.length > 0 ? (
				<Cart data={cartData} />
			) : (
				<EmptyCart />
			)}
		</Drawer>
	);
}

export default DrawerCart;
