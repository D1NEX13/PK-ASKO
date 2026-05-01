import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage/MainPage';
import Profile from './pages/Profile/Profile';
import Auth from './pages/AuthPage/Auth';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ServicePage from './pages/ServicesPage/ServicePage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: 'catalog',
				element: <CatalogPage />,
			},
			{
				element: <ProtectedRoute />,
				children: [{ path: 'profile', element: <Profile /> }],
			},
			{
				path: 'services',
				element: <ServicePage />,
			},
		],
	},
	{
		path: 'auth',
		element: <Auth />,
	},
]);
