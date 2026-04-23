import { RightOutlined } from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import type { ReactNode } from 'react';
import './Servises.scss';
import laserIcon from '../../../../../assets/icons/light.svg';
import tocarIcon from '../../../../../assets/icons/tocar.svg';
import frezIcon from '../../../../../assets/icons/frez.svg';

function Services(): ReactNode {
	return (
		<Flex
			wrap={true}
			gap={32}
			justify="center"
			style={{ padding: 50 }}
		>
			<Card
				style={{ width: 450 }}
				hoverable={true}
			>
				<Flex
					className="card__flex"
					justify="space-between"
				>
					<Typography.Title level={4}>Лазерная резка</Typography.Title>
					<img
						src={laserIcon}
						alt="Laser Icon"
						style={{ width: 24, height: 24, color: '#5b8db8' }}
					/>
				</Flex>

				<Typography.Paragraph>
					Высокоточная лазерная резка листового металла на современном оборудовании с ЧПУ.
					Быстро, качественно, с минимальными допусками.
				</Typography.Paragraph>

				<Typography.Link>
					Подробнее <RightOutlined />
				</Typography.Link>
			</Card>
			<Card style={{ width: 450 }}>
				<Flex
					className="card__flex"
					justify="space-between"
				>
					<Typography.Title level={4}>Фрезеровка</Typography.Title>
					<img
						src={frezIcon}
						alt="Frez Icon"
						style={{ width: 24, height: 24, color: '#5b8db8' }}
					/>
				</Flex>

				<Typography.Paragraph>
					Фрезерная обработка деталей любой сложности. Изготовление пресс-форм, штампов,
					корпусных деталей из алюминия, стали и пластика.
				</Typography.Paragraph>

				<Typography.Link>
					Подробнее <RightOutlined />
				</Typography.Link>
			</Card>
			<Card style={{ width: 450 }}>
				<Flex
					className="card__flex"
					justify="space-between"
				>
					<Typography.Title level={4}>Токарные работы</Typography.Title>
					<img
						src={tocarIcon}
						alt="Tocar Icon"
						style={{ width: 24, height: 24, color: '#5b8db8' }}
					/>
				</Flex>

				<Typography.Paragraph>
					Токарная обработка на станках с ЧПУ. Серийное и единичное производство деталей
					вращения: валы, оси, втулки, фланцы.
				</Typography.Paragraph>

				<Typography.Link>
					Подробнее <RightOutlined />
				</Typography.Link>
			</Card>
		</Flex>
	);
}

export default Services;
