import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, List, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import type { ReactNode } from 'react';
import ceh from '../../../../../assets/puctures/ceh.jpg';
import './About.scss';

const { Paragraph, Text } = Typography;

const data = [
	{
		title: 'Современный парк оборудования с ЧПУ',
	},
	{
		title: 'Строгий контроль качества на всех этапах',
	},
	{
		title: 'Индивидуальный подход к каждому заказу',
	},
	{
		title: 'Соблюдение сроков и гарантия результата',
	},
];

function About(): ReactNode {
	return (
		<Flex
			className="about"
			gap={64}
			justify="space-between"
		>
			<div className="about__content">
				<Paragraph className="about__description about__description--first">
					Производственная компания "АСКО" - надежный партнер в сфере металлообработки. Мы
					специализируемся на оказании полного цикла услуг по созданию металлических
					деталей: от лазерной резки до точной фрезерной обработки на современных станках
					с ЧПУ.
				</Paragraph>
				<Paragraph className="about__description">
					Наш опыт и использование передовых технологий позволяют нам выполнять заказы
					любой сложности, соблюдая строгие стандарты качества и точные сроки.
				</Paragraph>
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<List.Item.Meta
							style={{ display: 'flex', gap: 16 }}
							avatar={<CheckCircleOutlined style={{ fontSize: 24 }} />}
							title={
								<Typography.Text className="about__description">
									{item.title}
								</Typography.Text>
							}
						/>
					)}
				/>
				<Button
					type="primary"
					size="large"
					style={{ width: 'fit-content', marginTop: 24 }}
				>
					Подробнее о нас
				</Button>
			</div>
			<div className="about__image">
				<img
					src={ceh}
					alt="Производственный цех ПК АСКО"
					style={{ width: '100%', borderRadius: 8 }}
				/>
				<Card className="about__card">
					<Title>15+</Title>
					<Text className="about__description">Лет на рынке</Text>
				</Card>
			</div>
		</Flex>
	);
}

export default About;
