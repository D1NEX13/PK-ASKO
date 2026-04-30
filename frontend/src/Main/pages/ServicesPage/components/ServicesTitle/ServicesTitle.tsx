import { Flex, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import type { ReactNode } from 'react';

const metrics = [
	{
		title: '10+',
		text: 'Видов услуг',
	},
];

function ServicesTitle(): ReactNode {
	return (
		<Flex
			vertical={true}
			style={{ width: '50%' }}
		>
			<Title
				level={1}
				underline={true}
				style={{ fontSize: 60, lineHeight: '1.5' }}
			>
				ПРОИЗВОДСТВЕННЫЕ УСЛУГИ ПК АСКО
			</Title>
			<Typography.Text style={{ fontSize: 30, lineHeight: '1.5' }}>
				Полный цикл металлообработки на собственном производстве в Канаше. От раскроя листа
				и лазерной резки до токарно-фрезерных операций, термообработки и финишной покраски.
			</Typography.Text>
		</Flex>
	);
}

export default ServicesTitle;
