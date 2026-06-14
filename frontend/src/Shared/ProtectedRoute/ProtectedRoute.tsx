import { Navigate, Outlet } from 'react-router-dom';
import { useCommonStore } from '../stores/Common.store';

function ProtectedRoute() {
	const token = useCommonStore((s) => s.token);
	return token ? (
		<Outlet />
	) : (
		<Navigate
			to="/auth"
			replace
		/>
	);
}

export default ProtectedRoute;
