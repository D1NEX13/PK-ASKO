import { Outlet } from 'react-router-dom';
import './App.scss';
import { type ReactNode } from 'react';
import Header from '../Shared/Header/Header';
import { ConfigProvider, Layout } from 'antd';
import Footer from '../Shared/Footer/Footer';
import DrawerCart from '../Shared/DrawerCart/DrawerCart';

function App(): ReactNode {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#F97316',
					colorBgLayout: '#F4F7F8',
					colorText: '#1D2730',
					boxShadow: '0 12px 30px rgba(19, 52, 59, 0.12)',
					boxShadowSecondary: '0 8px 24px rgba(0,0,0,0.15)',
					borderRadius: 8,
					fontFamily: "'Manrope', sans-serif",
				},
			}}
		>
			<Layout className="app-layout">
				<Header />
				<Outlet />
				<Footer />
				<DrawerCart />
			</Layout>
		</ConfigProvider>
	);
}

export default App;
