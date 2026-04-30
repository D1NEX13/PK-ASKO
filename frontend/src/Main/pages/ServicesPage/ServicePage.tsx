import { Flex } from 'antd';
import type { ReactNode } from 'react';
import './ServicePage.scss';
import ServicesTitle from './components/ServicesTitle/ServicesTitle';

function ServicePage(): ReactNode {
	return (
		<Flex
			vertical={true}
			className="service-page"
		>
			<ServicesTitle />
			<div>Карточки услуг</div>
			<div>Как мы работаем</div>
			<div>Нужна консультация по услуге?</div>
		</Flex>
	);
}

export default ServicePage;
