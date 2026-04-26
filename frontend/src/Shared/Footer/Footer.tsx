import {
	EnvironmentOutlined,
	InstagramOutlined,
	MailOutlined,
	PhoneOutlined,
	WechatWorkOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Divider, Flex } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import './Footer.scss';

function Footer(): ReactNode {
	return (
		<Flex
			className="footer"
			vertical={true}
		>
			<Flex
				justify="space-between"
				gap={264}
			>
				<Flex
					vertical={true}
					className="footer__section"
				>
					<p className="footer__section-title">Контакты</p>
					<div className="footer__contact">
						<EnvironmentOutlined />
						<p>Чувашская Республика, г. Канаш, Янтиковское шоссе, 60</p>
					</div>
					<div className="footer__contact">
						<PhoneOutlined />
						<p>+7 (123) 456-78-90</p>
					</div>
					<div className="footer__contact">
						<MailOutlined />
						<p>info@example.com</p>
					</div>
				</Flex>
				<Flex
					vertical={true}
					className="footer__section"
				>
					<p className="footer__section-title">Навигация</p>
					<p>Каталог продукции</p>
					<p>Услуги</p>
					<p>О компании</p>
					<p>Контакты</p>
				</Flex>
				<Flex
					vertical={true}
					className="footer__section"
				>
					<p className="footer__section-title">Мы на связи</p>
					<p>
						Свяжитесь с нами в удобном для вас месенджере для быстрой консультации и
						расчета стоимости.
					</p>
					<div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
						<InstagramOutlined style={{ fontSize: '50px' }} />
						<WechatWorkOutlined style={{ fontSize: '50px' }} />
					</div>
				</Flex>
			</Flex>
			<Divider />
			<Flex
				justify="space-between"
				className="footer__bottom"
			>
				<Flex
					align="center"
					gap={8}
				>
					<p>© 2024 ПК АСКО. Все права защищены.</p>
				</Flex>
				<Flex gap={16}>
					<Link
						style={{ textDecoration: 'none', color: 'inherit' }}
						to=""
					>
						Политика конфиденциальности
					</Link>
					<Link
						style={{ textDecoration: 'none', color: 'inherit' }}
						to=""
					>
						Условия использования
					</Link>
					<Tooltip title="Перейти в Telegram">
						<a
							href="https://t.me/+G0WwifsD1qIxYzcy"
							target="_blank"
							rel="noopener noreferrer"
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							Команда разработки
						</a>
					</Tooltip>
				</Flex>
			</Flex>
		</Flex>
	);
}
export default Footer;
