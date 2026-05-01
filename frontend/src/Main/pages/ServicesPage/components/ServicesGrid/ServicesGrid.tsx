import { Col, Row } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';
import ServiceCard from './components/ServiceCard';

export interface Service {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	tags: string[];
}

function ServicesGrid(): ReactNode {
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const token = localStorage.getItem('token');

	const [services, setServices] = useState<Service[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			const res = await fetch('http://localhost:3000/services', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				setServices(data);
			} else {
				const error = await res.json();
				console.log(error);
			}
		};
		fetchServices();
	}, [token]);

	return (
		<div style={{ background: '#0d1b2a', padding: '0 96px 64px' }}>
			<Row gutter={[12, 12]}>
				{services.map((s) => (
					<Col
						key={s.id}
						span={6}
					>
						<ServiceCard
							service={s}
							isHovered={hoveredId === s.id}
							onMouseEnter={() => setHoveredId(s.id)}
							onMouseLeave={() => setHoveredId(null)}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}

export default ServicesGrid;
