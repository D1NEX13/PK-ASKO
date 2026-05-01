import { ArrowRightOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import type { ReactNode } from 'react';
import './ConsultationBanner.scss';

function ConsultationBanner(): ReactNode {
	return (
		<div className="consultation-banner">
			<Flex
				justify="space-between"
				align="center"
				wrap="wrap"
				gap={24}
			>
				<div>
					<div className="consultation-banner__title">Нужна консультация по услуге?</div>
					<p className="consultation-banner__description">
						Позвоните нам или оставьте заявку — технолог ответит на все вопросы и
						рассчитает стоимость работ.
					</p>
				</div>

				<Flex gap={16}>
					<Button
						size="large"
						icon={<PhoneOutlined />}
						className="consultation-banner__btn-primary"
					>
						Позвонить
					</Button>
					<Button
						size="large"
						icon={<ArrowRightOutlined />}
						iconPosition="end"
						className="consultation-banner__btn-secondary"
					>
						Написать
					</Button>
				</Flex>
			</Flex>
		</div>
	);
}

export default ConsultationBanner;
