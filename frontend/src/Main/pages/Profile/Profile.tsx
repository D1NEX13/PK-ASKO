import { useEffect, useState, type ReactNode } from 'react';
import ProfileSidebar from './components/ProfileSidebar/ProfileSidebar';
import Flex from 'antd/es/flex';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import type { IUser } from '../../../Shared/types/user';
import Orders from './components/Orders/Orders';
import Security from './components/Security/Security';
import { ProfileSections } from '../../../../../frontend/src/Shared/types/profile';

type ProfileSections = (typeof ProfileSections)[keyof typeof ProfileSections];

function Profile(): ReactNode {
	const token = localStorage.getItem('token');

	const [userInfo, setUserInfo] = useState<IUser | null>(null);
	const [activeSection, setActiveSection] = useState<ProfileSections>(
		ProfileSections.PersonalInfo,
	);

	const sectionMap: Record<ProfileSections, ReactNode> = {
		[ProfileSections.PersonalInfo]: <PersonalInfo data={userInfo ?? ({} as IUser)} />,
		[ProfileSections.Orders]: <Orders />,
		[ProfileSections.Security]: <Security />,
	};

	useEffect(() => {
		const getUserInfo = async () => {
			const res = await fetch('http://localhost:3000/profile', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				setUserInfo(data);
			} else {
				const error = await res.json();
				console.error(error);
			}
		};
		getUserInfo();
	}, [token]);

	return (
		<Flex
			style={{ padding: '24px 96px 0px 96px', width: '100%', minHeight: '100vh' }}
			wrap={true}
			gap={24}
		>
			<div style={{ flexShrink: 0, width: 350 }}>
				<ProfileSidebar
					user={userInfo ?? ({} as IUser)}
					activeSection={activeSection}
					onSectionChange={setActiveSection}
				/>
			</div>

			<div style={{ flex: 1 }}>{sectionMap[activeSection]}</div>
		</Flex>
	);
}

export default Profile;
