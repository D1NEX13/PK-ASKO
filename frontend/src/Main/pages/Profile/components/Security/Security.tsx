import { LockOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message } from 'antd';
import type { ReactNode } from 'react';
import ProfileCard from '../../../../../Shared/ProfileCard/ProfileCard';

interface ChangePasswordForm {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

function Security(): ReactNode {
	const [form] = Form.useForm<ChangePasswordForm>();

	const onFinish = async (values: ChangePasswordForm) => {
		const token = localStorage.getItem('token');
		const res = await fetch('http://localhost:3000/profile/change-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				oldPassword: values.oldPassword,
				newPassword: values.newPassword,
			}),
		});
		if (res.ok) {
			message.success('Пароль успешно изменён');
			form.resetFields();
		} else {
			const error = await res.json();
			message.error(error.message ?? 'Ошибка при смене пароля');
		}
	};

	return (
		<ProfileCard
			icon={<LockOutlined />}
			title="БЕЗОПАСНОСТЬ"
		>
			<Form
				layout="vertical"
				size="large"
				form={form}
				onFinish={onFinish}
			>
				<Form.Item
					label="СТАРЫЙ ПАРОЛЬ"
					name="oldPassword"
					rules={[{ required: true, message: 'Введите старый пароль' }]}
				>
					<Input.Password prefix={<LockOutlined />} />
				</Form.Item>
				<Flex gap={16}>
					<Form.Item
						label="НОВЫЙ ПАРОЛЬ"
						name="newPassword"
						style={{ flex: 1 }}
						rules={[
							{ required: true, message: 'Введите новый пароль' },
							{ min: 6, message: 'Минимум 6 символов' },
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>
					<Form.Item
						label="ПОДТВЕРЖДЕНИЕ ПАРОЛЯ"
						name="confirmPassword"
						style={{ flex: 1 }}
						dependencies={['newPassword']}
						rules={[
							{ required: true, message: 'Подтвердите новый пароль' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Пароли не совпадают'));
								},
							}),
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>
				</Flex>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
					>
						Сменить пароль
					</Button>
				</Form.Item>
			</Form>
		</ProfileCard>
	);
}

export default Security;
