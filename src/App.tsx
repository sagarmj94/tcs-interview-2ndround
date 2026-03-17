import { AppRouter } from './routes/AppRouter';
import { Box, CircularProgress } from '@mui/material';
import { useBootstrapAuth } from './hooks/useBootstrapAuth';

export default function App() {
  const { ready } = useBootstrapAuth();
  if (!ready) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  return <AppRouter />;
}
