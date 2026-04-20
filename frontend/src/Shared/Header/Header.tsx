import { Layout, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import personIcon from '../../assets/icons/person.svg'
import cartIcon from '../../assets/icons/cart.svg'

const menuItems: MenuProps['items'] = [
  {
    key: '/catalog',
    label: <Link to="/">Каталог</Link>,
  },
  {
    key: '/services',
    label: <Link to="/">Услуги</Link>,
  },
  {
    key: '/about',
    label: <Link to="/">О компании</Link>,
  },
  {
    key: '/info',
    label: <Link to="/">Инфо</Link>,
  },
  {
    key: '/contacts',
    label: <Link to="/">Контакты</Link>,
  },
]

function Header(): ReactNode {
  return (
    <Layout.Header className="app-header">
      <div className="app-header__brand">
        <Typography.Text strong className="app-header__brand-text">
          ПК АСКО
        </Typography.Text>
      </div>
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
        <img src={cartIcon} alt="Cart" />
        <img src={personIcon} alt="Person" />
      </div>
    </Layout.Header>
  )
}

export default Header
