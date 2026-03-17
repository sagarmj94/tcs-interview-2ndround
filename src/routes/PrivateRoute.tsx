import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authStore } from '../store/authStore';
import { ROUTES } from '../constants/routes';

export function PrivateRoute() {
  const accessToken = authStore((s) => s.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

