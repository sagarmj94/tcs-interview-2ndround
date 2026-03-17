import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="h5" fontWeight={800}>
        Page not found
      </Typography>
      <Typography color="text.secondary">The page you’re looking for doesn’t exist.</Typography>
      <Button onClick={() => navigate(ROUTES.invoices)}>Go to invoices</Button>
    </Stack>
  );
}

