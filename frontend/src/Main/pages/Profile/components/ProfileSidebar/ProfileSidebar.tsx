import { LockOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Menu, type MenuProps } from 'antd';
import type { ReactNode } from 'react';
import './ProfileSidebar.scss';
import type { IUser } from '../../../../../Shared/types/user';
import { ProfileSections, type ProfileSection } from '../../../../../Shared/types/profile';

interface ProfileSidebarProps {
	user: IUser;
	activeSection?: ProfileSection;
	onSectionChange?: (section: ProfileSection) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		key: ProfileSections.PersonalInfo,
		label: 'Личные данные',
		icon: <UserOutlined />,
	},
	{
		key: ProfileSections.Orders,
		label: 'Мои заказы',
		icon: <ShoppingOutlined />,
	},
	{
		key: ProfileSections.Security,
		label: 'Безопасность',
		icon: <LockOutlined />,
	},
	{
		type: 'divider',
	},
];

function ProfileSidebar(props: ProfileSidebarProps): ReactNode {
	const { user, activeSection, onSectionChange } = props;
	return (
		<Card
			style={{ boxShadow: '0 12px 30px rgba(19, 52, 59, 0.15)' }}
			title={
				<Flex
					align="center"
					gap={12}
					style={{
						background: '#F97316',
						padding: '16px 24px',
						height: 96,
						margin: '0px',
						borderRadius: '8px 8px 0 0',
					}}
				>
					<Avatar
						size={64}
						icon={<UserOutlined />}
						style={{ flexShrink: 0 }}
					/>
					<div className="user-info">
						<span>
							{user.firstName} {user.lastName}
						</span>
						<span>{user.email}</span>
					</div>
				</Flex>
			}
			styles={{ header: { padding: 0, color: '#fff' }, body: { padding: 0 } }}
		>
			<Menu
				style={{ width: '100%' }}
				items={items}
				selectedKeys={[activeSection]}
				onClick={(e) => onSectionChange?.(e.key as ProfileSection)}
			/>
			<div className="orders-count">
				<span className="orders-label">ЗАКАЗОВ</span>
				<span className="orders-number">5</span>
			</div>
		</Card>
	);
}

export default ProfileSidebar;
