import { MailOutlined, PhoneOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Form, Input } from 'antd';
import { useEffect, type ReactNode } from 'react';
import ProfileCard from '../../../../../Shared/ProfileCard/ProfileCard';
import type { IUser } from '../../../../../Shared/types/user';

interface PersonalInfoProps {
	data: IUser;
}

function PersonalInfo(props: PersonalInfoProps): ReactNode {
	const { data } = props;
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			companyName: data.companyName,
		});
	}, [data, form]);

	return (
		<Flex
			vertical={true}
			gap={24}
		>
			<ProfileCard
				icon={<UserOutlined />}
				title="ЛИЧНЫЕ ДАННЫЕ"
			>
				<Form
					layout="vertical"
					size="large"
					form={form}
					initialValues={data}
				>
					<Flex gap={16}>
						<Form.Item
							label="ИМЯ"
							name="firstName"
							style={{ flex: 1 }}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Имя"
							/>
						</Form.Item>
						<Form.Item
							label="ФАМИЛИЯ"
							name="lastName"
							style={{ flex: 1 }}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Фамилия"
							/>
						</Form.Item>
					</Flex>
				</Form>
			</ProfileCard>

			<ProfileCard
				icon={<MailOutlined />}
				title="КОНТАКТНАЯ ИНФОРМАЦИЯ"
			>
				<Form
					layout="vertical"
					size="large"
					form={form}
				>
					<Flex gap={16}>
						<Form.Item
							label="EMAIL"
							name="email"
							style={{ flex: 1 }}
						>
							<Input
								prefix={<MailOutlined />}
								placeholder="Email"
							/>
						</Form.Item>
						<Form.Item
							label="НОМЕР ТЕЛЕФОНА"
							name="phone"
							style={{ flex: 1 }}
						>
							<Input
								prefix={<PhoneOutlined />}
								placeholder="Номер телефона"
							/>
						</Form.Item>
					</Flex>
					<Form.Item
						label={
							<span>
								НАЗВАНИЕ КОМПАНИИ{' '}
								<span style={{ fontWeight: 400, opacity: 0.6 }}>
									(необязательно)
								</span>
							</span>
						}
						name="companyName"
					>
						<Input
							prefix={<ShopOutlined />}
							placeholder="Название компании"
						/>
					</Form.Item>
				</Form>
			</ProfileCard>
		</Flex>
	);
}

export default PersonalInfo;
