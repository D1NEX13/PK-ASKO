import { ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import type { ReactNode } from 'react';
import './HowWeWork.scss';

const STEPS = [
	{
		num: '01',
		title: 'Заявка',
		text: 'Отправьте запрос по телефону, email или через форму на сайте — с чертежом или описанием.',
	},
	{
		num: '02',
		title: 'Расчёт',
		text: 'Технологи изучают задачу, подбирают оптимальный метод обработки и готовят коммерческое предложение.',
	},
	{
		num: '03',
		title: 'Производство',
		text: 'Изготавливаем на собственном оборудовании с контролем качества на каждом этапе.',
	},
	{
		num: '04',
		title: 'Отгрузка',
		text: 'Готовые детали упакуем и отправим транспортной компанией или выдадим самовывозом.',
	},
];

function HowWeWork(): ReactNode {
	return (
		<div className="how-we-work">
			<div className="how-we-work__header">
				<div className="how-we-work__accent-line" />
				<span className="how-we-work__title">Как мы работаем</span>
			</div>

			<Row gutter={[16, 16]}>
				{STEPS.map((step, i) => (
					<Col
						key={step.num}
						span={6}
					>
						<div className="how-we-work__step">
							<div className="how-we-work__step-num">{step.num}</div>
							<div className="how-we-work__step-header">
								<span className="how-we-work__step-title">{step.title}</span>
								{i < STEPS.length - 1 && (
									<ArrowRightOutlined className="how-we-work__step-arrow" />
								)}
							</div>
							<p className="how-we-work__step-text">{step.text}</p>
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default HowWeWork;
