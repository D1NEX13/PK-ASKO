import { Flex } from 'antd';
import type { ReactNode } from 'react';
import './ServicePage.scss';
import ConsultationBanner from './components/ConsultationBanner/ConsultationBanner';
import HowWeWork from './components/HowWeWork/HowWeWork';
import ServicesGrid from './components/ServicesGrid/ServicesGrid';
import ServicesTitle from './components/ServicesTitle/ServicesTitle';

function ServicePage(): ReactNode {
	return (
		<Flex
			vertical={true}
			className="service-page"
		>
			<ServicesTitle />
			<ServicesGrid />
			<HowWeWork />
			<ConsultationBanner />
		</Flex>
	);
}

export default ServicePage;
