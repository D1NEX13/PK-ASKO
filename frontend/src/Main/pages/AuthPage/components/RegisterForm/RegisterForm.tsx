import { type ReactNode } from 'react';
import type { IAuth } from '../../../../../Shared/types/auth';
import { Button, Flex, Form, Input } from 'antd';
import {
	BankOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons';

interface RegisterFormProps {
	onSwitch: () => void;
}

function RegisterForm(props: RegisterFormProps): ReactNode {
	const { onSwitch } = props;
	const onFinish = async (values: IAuth) => {
		const res = await fetch('http://localhost:3000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});
		if (res.ok) {
			onSwitch();
		} else {
			const error = await res.json();
			console.error(error);
		}
	};
	const [form] = Form.useForm<IAuth>();

	const validateMessages = {
		required: "Поле '${name}' обязательно для заполнения!",
	};
	return (
		<Form
			form={form}
			layout="vertical"
			size="middle"
			style={{ width: 400 }}
			validateMessages={validateMessages}
			onFinish={onFinish}
		>
			<Flex gap={8}>
				<Form.Item
					label="ИМЯ"
					name="firstName"
					style={{ flex: 1 }}
				>
					<Input
						placeholder="Иван"
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item
					label="ФАМИЛИЯ"
					name="lastName"
					style={{ flex: 1 }}
				>
					<Input
						placeholder="Петров"
						prefix={<UserOutlined />}
					/>
				</Form.Item>
			</Flex>
			<Form.Item
				label="EMAIL"
				name="email"
				rules={[{ required: true }]}
			>
				<Input
					type="email"
					placeholder="example@company.com"
					prefix={<MailOutlined />}
				/>
			</Form.Item>
			<Form.Item
				label="НОМЕР ТЕЛЕФОНА"
				name="phone"
				rules={[{ required: true }]}
			>
				<Input
					type="tel"
					placeholder="+7 (999) 999-99-99"
					prefix={<PhoneOutlined />}
				/>
			</Form.Item>
			<Form.Item
				label="НАЗВАНИЕ КОМПАНИИ"
				name="companyName"
			>
				<Input
					placeholder='ООО "Компания"'
					prefix={<BankOutlined />}
				/>
			</Form.Item>
			<Form.Item
				label="ПАРОЛЬ"
				name="password"
				rules={[
					{ required: true },
					{ min: 6, message: 'Пароль должен содержать не менее 6 символов' },
				]}
			>
				<Input.Password
					placeholder="Введите пароль"
					iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					prefix={<LockOutlined />}
				/>
			</Form.Item>
			<Form.Item
				label="ПОДТВЕРЖДЕНИЕ ПАРОЛЯ"
				name="confirmPassword"
				rules={[{ required: true }]}
			>
				<Input.Password
					placeholder="Подтвердите пароль"
					iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					prefix={<LockOutlined />}
				/>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
				>
					СОЗДАТЬ АККАУНТ
				</Button>
			</Form.Item>
			<p>
				Уже есть аккаунт? <a onClick={onSwitch}>Войти</a>
			</p>
		</Form>
	);
}

export default RegisterForm;
