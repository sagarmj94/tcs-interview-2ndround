import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { ROUTES } from '../constants/routes';
import { authStore } from '../store/authStore';
import { LogoutIcon } from '../components/icons/LogoutIcon';

export function DashboardLayout() {
  const navigate = useNavigate();
  const user = authStore((s) => s.user);
  const logout = authStore((s) => s.logout);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={800} sx={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.invoices)}>
            Invoice Management
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            {user ? (
              <Typography variant="body2" color="text.secondary">
                {user.email} · {user.role}
              </Typography>
            ) : null}
            <IconButton
              aria-label="logout"
              onClick={() => {
                logout();
                navigate(ROUTES.login, { replace: true });
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Invoice Management System
            </Typography>
            <Button size="small" variant="text" onClick={() => navigate(ROUTES.invoices)}>
              Invoices
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

