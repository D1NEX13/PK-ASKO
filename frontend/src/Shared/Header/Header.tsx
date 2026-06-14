import { Badge, Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import personIcon from '../../assets/icons/person.svg';
import cartIcon from '../../assets/icons/cart.svg';
import { useCommonStore } from '../stores/Common.store';

const menuItems: MenuProps['items'] = [
	{
		key: '/catalog',
		label: <Link to="/catalog">Каталог</Link>,
	},
	{
		key: '/services',
		label: <Link to="/services">Услуги</Link>,
	},
	{
		key: '/about',
		label: <a href="#about">О компании</a>,
	},
	{
		key: '/info',
		label: <a href="#faq">Инфо</a>,
	},
	{
		key: '/contacts',
		label: <a href="#map">Контакты</a>,
	},
];

function Header(): ReactNode {
	const { openCart } = useCommonStore();
	const [scrolled, setScrolled] = useState(false);
	const cartCounter = useCommonStore((s) => s.cartData?.items?.length ?? 0);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 0);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<Layout.Header className={`app-header${scrolled ? ' app-header--scrolled' : ''}`}>
			<Link
				to="/"
				className="app-header__brand"
			>
				<Typography.Text
					strong
					className="app-header__brand-text"
					style={{ color: '#F97316', fontSize: 24 }}
				>
					ПК АСКО
				</Typography.Text>
			</Link>
			<div className="app-header__menu-wrap">
				<Menu
					className="app-header__menu"
					mode="horizontal"
					theme="light"
					disabledOverflow
					selectable={false}
					items={menuItems}
				/>
			</div>

			<div className="app-header__icons">
				<Badge count={cartCounter ?? 0}>
					<img
						style={{ cursor: 'pointer' }}
						src={cartIcon}
						alt="Cart"
						onClick={() => {
							openCart(true);
						}}
					/>
				</Badge>
				<Link to="/profile">
					<img
						src={personIcon}
						alt="Person"
					/>
				</Link>
			</div>
		</Layout.Header>
	);
}

export default Header;
