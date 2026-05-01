import { Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import personIcon from '../../assets/icons/person.svg';
import cartIcon from '../../assets/icons/cart.svg';

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
	return (
		<Layout.Header className="app-header">
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
				<img
					src={cartIcon}
					alt="Cart"
				/>
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
