import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { PrivateRoute } from './PrivateRoute';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { InvoiceListPage } from '../pages/InvoiceListPage';
import { InvoiceCreatePage } from '../pages/InvoiceCreatePage';
import { InvoiceEditPage } from '../pages/InvoiceEditPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RoleGuard } from './RoleGuard';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.signup, element: <SignupPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: ROUTES.app, element: <Navigate to={ROUTES.invoices} replace /> },
          { path: ROUTES.invoices, element: <InvoiceListPage /> },
          {
            element: <RoleGuard permission="invoice:create" />,
            children: [{ path: ROUTES.invoiceNew, element: <InvoiceCreatePage /> }],
          },
          {
            element: <RoleGuard permission="invoice:update" />,
            children: [{ path: '/invoices/:id/edit', element: <InvoiceEditPage /> }],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

