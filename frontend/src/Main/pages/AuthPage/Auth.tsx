import { ConfigProvider, Flex, Card } from 'antd';
import { useState, type ReactNode } from 'react';
import './Auth.scss';
import { LockOutlined } from '@ant-design/icons';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

function Auth(): ReactNode {
	const [mode, setMode] = useState<'login' | 'register'>('login');

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#F97316',
					colorBgLayout: '#F4F7F8',
					colorText: '#1D2730',
					fontSize: 16,
					borderRadius: 8,
				},
			}}
		>
			<Flex
				className="auth"
				align="center"
				justify="center"
			>
				<Card
					style={{ boxShadow: '0 12px 30px rgba(19, 52, 59, 0.5)' }}
					title={
						<Flex
							align="center"
							gap={12}
							style={{
								background: '#F97316',
								padding: '16px 24px',
								height: 96,
								borderRadius: '8px 8px 0 0',
							}}
						>
							<LockOutlined style={{ fontSize: 20, color: '#fff' }} />
							<Flex vertical>
								<span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>
									{mode === 'login' ? 'ВХОД В СИСТЕМУ' : 'РЕГИСТРАЦИЯ'}
								</span>
							</Flex>
						</Flex>
					}
					styles={{ header: { padding: 0, border: 'none' } }}
				>
					{mode === 'login' ? (
						<LoginForm onSwitch={() => setMode('register')} />
					) : (
						<RegisterForm onSwitch={() => setMode('login')} />
					)}
				</Card>
			</Flex>
		</ConfigProvider>
	);
}

export default Auth;
