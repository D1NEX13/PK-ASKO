import type { ReactNode } from 'react';
import type { IAuth } from '../../../../../Shared/types/auth';
import { Button, Form, Input, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
	onSwitch: () => void;
}

function LoginForm(props: LoginFormProps): ReactNode {
	const onFinish = async (values: IAuth) => {
		const res = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});
		if (res.ok) {
			const data = await res.json();
			localStorage.setItem('token', data.access_token);
			navigate('/profile');
		} else {
			const error = await res.json();
			console.error(error);
		}
	};
	const { onSwitch } = props;
	const [form] = Form.useForm<IAuth>();
	const navigate = useNavigate();

	const validateMessages = {
		required: "Поле '${name}' обязательно для заполнения!",
	};
	return (
		<Form
			form={form}
			layout="vertical"
			size="large"
			style={{ width: 400 }}
			validateMessages={validateMessages}
			onFinish={onFinish}
		>
			<Form.Item
				label="ЛОГИН"
				name="email"
				rules={[{ required: true }]}
			>
				<Input
					type="email"
					prefix={<UserOutlined />}
					placeholder="Введите логин"
				/>
			</Form.Item>
			<Form.Item
				label="ПАРОЛЬ"
				name="password"
				rules={[{ required: true }]}
			>
				<Input.Password
					placeholder="Введите пароль"
					iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					prefix={<LockOutlined />}
				/>
			</Form.Item>
			<Form.Item>
				<a href="">Забыли пароль?</a>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{ width: '100%' }}
				>
					ВОЙТИ
				</Button>
			</Form.Item>
			<Divider>Или</Divider>
			<p>
				Нет аккаунта? <a onClick={onSwitch}>Зарегистрироваться</a>
			</p>
		</Form>
	);
}

export default LoginForm;
