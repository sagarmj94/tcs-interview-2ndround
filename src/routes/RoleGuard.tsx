import { Navigate, Outlet } from 'react-router-dom';
import type { Permission } from '../constants/rbac';
import { ROUTES } from '../constants/routes';
import { authStore } from '../store/authStore';
import { hasPermission } from '../utils/rbac';

type Props = {
  permission: Permission;
  redirectTo?: string;
};

export function RoleGuard({ permission, redirectTo }: Props) {
  const user = authStore((s) => s.user);
  if (!user) return <Navigate to={ROUTES.login} replace />;

  if (!hasPermission(user.role, permission)) {
    return <Navigate to={redirectTo ?? ROUTES.invoices} replace />;
  }

  return <Outlet />;
}

