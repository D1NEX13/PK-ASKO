import { Tag } from 'antd';
import type { Service } from '../ServicesGrid';
import { RightOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import './ServiceCard.scss';

const API_URL = 'http://localhost:3000';

interface ServiceCardProps {
	service: Service;
	isHovered: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

function ServiceCard(props: ServiceCardProps): ReactNode {
	const { service, isHovered, onMouseEnter, onMouseLeave } = props;

	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`service-card${isHovered ? ' is-hovered' : ''}`}
			style={{ backgroundImage: service.imageUrl ? `url(${API_URL}${service.imageUrl})` : undefined }}
		>
			<div className="service-card__title">{service.name}</div>

			<div className="service-card__overlay">
				<span className="service-card__overlay-name">{service.name}</span>
				<p className="service-card__description">{service.description}</p>
				<div className="service-card__tags">
					{service.tags.map((tag) => (
						<Tag
							key={tag}
							className="service-card__tag"
						>
							{tag}
						</Tag>
					))}
				</div>
				<button className="service-card__button">
					Запросить <RightOutlined />
				</button>
			</div>
		</div>
	);
}

export default ServiceCard;
