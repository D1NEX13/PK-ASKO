import { Card, Flex } from 'antd';
import type { ReactNode } from 'react';

interface ProfileCardProps {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}

function ProfileCard({ icon, title, children }: ProfileCardProps): ReactNode {
	return (
		<Card
			style={{ boxShadow: '0 12px 30px rgba(19, 52, 59, 0.15)', width: '100%' }}
			title={
				<Flex
					align="center"
					gap={12}
					style={{
						background: '#F97316',
						padding: '16px 24px',
						height: 96,
						borderRadius: '8px 8px 0 0',
						fontSize: 24,
					}}
				>
					{icon}
					<span>{title}</span>
				</Flex>
			}
			styles={{ header: { padding: 0, color: '#fff' } }}
		>
			{children}
		</Card>
	);
}

export default ProfileCard;
