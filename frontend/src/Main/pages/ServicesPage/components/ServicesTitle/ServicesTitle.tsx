import { Breadcrumb, Flex, Typography } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './ServicesTitle.scss';

const METRICS = [
	{ value: '10+', label: 'Видов услуг' },
	{ value: '30+', label: 'Лет опыта' },
	{ value: '≤0,1 мм', label: 'Точность ЧПУ' },
	{ value: '200+', label: 'Клиентов' },
];

function ServicesTitle(): ReactNode {
	return (
		<div className="services-title">
			<Breadcrumb
				className="services-title__breadcrumb"
				items={[
					{
						title: (
							<Link
								to="/"
								style={{ color: '#fff' }}
							>
								Главная
							</Link>
						),
					},
					{ title: <span style={{ color: '#fff' }}>Услуги</span> },
				]}
			/>

			<Flex
				align="center"
				gap={12}
				className="services-title__subtitle-row"
			>
				<div className="services-title__accent-line" />
				<span className="services-title__subtitle">Металлообработка</span>
			</Flex>

			<Typography.Title
				level={1}
				className="services-title__heading"
			>
				Производственные услуги ПК АСКО
			</Typography.Title>

			<Typography.Paragraph className="services-title__description">
				Полный цикл металлообработки на собственном производстве в Канаше. От раскроя листа
				и лазерной резки до токарно-фрезерных операций, термообработки и финишной покраски.
			</Typography.Paragraph>

			<Flex className="services-title__metrics">
				{METRICS.map((m) => (
					<Flex
						key={m.value}
						vertical
						className="services-title__metric"
					>
						<span className="services-title__metric-value">{m.value}</span>
						<span className="services-title__metric-label">{m.label}</span>
					</Flex>
				))}
			</Flex>
		</div>
	);
}

export default ServicesTitle;
