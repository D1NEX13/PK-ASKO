import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage/MainPage';
import Profile from './pages/Profile/Profile';
import Auth from './pages/AuthPage/Auth';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';
import CatalogPage from './pages/CatalogPage/CatalogPage';

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
		],
	},
	{
		path: 'auth',
		element: <Auth />,
	},
]);
