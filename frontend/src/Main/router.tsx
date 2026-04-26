import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage/MainPage';
import Profile from './pages/Profile/Profile';
import Auth from './pages/AuthPage/Auth';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';

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
				element: <ProtectedRoute />, // ← обёртка
				children: [{ path: 'profile', element: <Profile /> }],
			},
		],
	},
	{
		path: 'auth',
		element: <Auth />,
	},
]);
